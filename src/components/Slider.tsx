import { SliderComponent } from 'obsidian';
import { createRenderEffect } from 'solid-js';

export default function Slider(props: {
    value: number;
    min: number;
    max: number;
    step: number | 'any';
    onChange?: (value: number) => void;
    dynamicTooltip?: boolean;
    format?: SliderValueFormat;
    disabled?: boolean;
    instant?: boolean;
    classList?: Record<string, boolean>;
}) {
    // Ideally, I would like to purely recreate the slider component in solid, but
    // Obsidian API does not have a way to hide tooltips programmatically, so this is
    // just an effect-based wrapper around the Obsidian API's SliderComponent.
    const dummyContainerEl = createDiv();
    const slider = new FormattableSliderComponent(dummyContainerEl);
    dummyContainerEl.removeChild(slider.sliderEl);

    createRenderEffect(() => {
        slider.setLimits(props.min, props.max, props.step).setValue(props.value);
        if (props.instant) {
            slider.setInstant(true);
        }
        if (props.dynamicTooltip) {
            slider.setDynamicTooltip();
        }
        if (props.format) {
            slider.setFormat(props.format);
        }
        if (props.onChange) {
            slider.onChange(props.onChange);
        }
        if (props.disabled) {
            slider.setDisabled(true);
        }
        if (props.classList) {
            for (const [key, value] of Object.entries(props.classList)) {
                slider.sliderEl.toggleClass(key, value);
            }
        }
    });

    return slider.sliderEl;

    // return (
    //     <div
    //         ref={el => {
    //             const slider = new SliderComponent(el);

    //             onMount(() => {
    //                 el.replaceWith(slider.sliderEl);
    //             });

    //             createEffect(() => {
    //                 slider
    //                     .setLimits(props.min, props.max, props.step)
    //                     .setValue(props.value);
    //                 if (props.instant) {
    //                     slider.setInstant(true);
    //                 }
    //                 if (props.dynamicTooltip) {
    //                     slider.setDynamicTooltip();
    //                 }
    //                 if (props.onChange) {
    //                     slider.onChange(props.onChange);
    //                 }
    //                 if (props.disabled) {
    //                     slider.setDisabled(true);
    //                 }
    //                 if (props.classList) {
    //                     for (const [key, value] of Object.entries(props.classList)) {
    //                         slider.sliderEl.toggleClass(key, value);
    //                     }
    //                 }
    //             });
    //         }}
    //     />
    // );

    // let sliderEl: HTMLInputElement | undefined

    // onMount(() => {
    //     if (props.dynamicTooltip) {
    //         sliderEl!.addEventListener('mouseenter', showTooltip);
    //         sliderEl!.addEventListener('mouseleave', hideTooltip);
    //     }
    // })

    // function getValue() {
    //     return sliderEl!.valueAsNumber;
    // }

    // function getValuePretty() {
    //     const value = getValue();
    //     if (props.step === "any" || props.step < 1) {
    //         return value.toFixed(2);
    //     }
    //     return value.toString();
    // }

    // function showTooltip() {
    //     if (!sliderEl) return;

    //     displayTooltip(sliderEl, getValuePretty(), {
    //         placement: "top"
    //     });
    // }

    // return (
    //     <input
    //         ref={sliderEl}
    //         type="range"
    //         min={props.min}
    //         max={props.max}
    //         step={props.step}
    //         {/* WE MUST SET THE VALUE AFTER THE MIN, MAX AND STEP TO AVOID THE VALUE BEING CRAMPED */}
    //         value={props.value}
    //         classList={{
    //             'slider': true,
    //             ...props.classList,
    //         }}
    //         disabled={props.disabled}
    //         on:input={() => {
    //             if (props.dynamicTooltip) {
    //                 showTooltip();
    //             }
    //             if (props.instant) {
    //                 props.onChange?.(getValue());
    //             }
    //         }}
    //         on:change={() => {
    //             if (!props.instant) {
    //                 props.onChange?.(getValue());
    //             }
    //         }}
    //         on:click={(e) => {
    //             e.stopPropagation();
    //         }}
    //     />
    // );
}

export type SliderValueFormat =
    | ((value: number) => string)
    | {
          all?: (value: number) => string;
          min?: (value: number) => string;
          intermediate?: (value: number) => string;
          max?: (value: number) => string;
      };

/**
 * Allows you to customize the format used by the `getValuePretty` method, which is used when displaying tooltips.
 */
class FormattableSliderComponent extends SliderComponent {
    format?: SliderValueFormat;

    setFormat(format?: SliderValueFormat): this {
        this.format = format;
        return this;
    }

    getValuePretty(): string {
        if (this.format) {
            const value = this.getValue();

            if (typeof this.format === 'function') {
                return this.format(value);
            }

            const { all, min, max, intermediate } = this.format;

            if (all) {
                return all(value);
            }

            if (min) {
                const minValue = parseFloat(this.sliderEl.min);
                if (value <= minValue) return min(value);
            }

            if (max) {
                const maxValue = parseFloat(this.sliderEl.max);
                if (value >= maxValue) return max(value);
            }

            if (intermediate) {
                return intermediate(value);
            }
        }

        return super.getValuePretty();
    }
}
