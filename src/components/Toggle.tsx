import type { Ref } from 'solid-js';

export default function Toggle(props: {
    value: boolean;
    onChange?: (value: boolean) => unknown;
    disabled?: boolean;
    small?: boolean;
    ref?: Ref<HTMLDivElement>;
    classList?: Record<string, boolean>;
}) {
    return (
        <div
            ref={props.ref}
            classList={{
                'checkbox-container': true,
                'is-enabled': props.value,
                'is-disabled': props.disabled,
                'mod-small': props.small,
                ...props.classList,
            }}
            on:click={() => {
                if (!props.disabled) {
                    props.onChange?.(!props.value);
                }
            }}
        >
            <input type="checkbox" tabIndex="0" />
        </div>
    );
}
