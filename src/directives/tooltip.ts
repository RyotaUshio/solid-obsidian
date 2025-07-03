import type { TooltipOptions } from 'obsidian';
import { setTooltip } from 'obsidian';
import type { Accessor } from 'solid-js';
import { createRenderEffect } from 'solid-js';

export type TooltipConfig =
    | string
    | {
          text: string;
          options?: TooltipOptions;
      };

export function tooltip(el: Element, tooltip: Accessor<TooltipConfig | undefined>) {
    createRenderEffect(() => {
        const config = tooltip();
        if (typeof config === 'string') {
            setTooltip(el as HTMLElement, config);
        } else if (config) {
            setTooltip(el as HTMLElement, config.text, config.options);
        }
    });
}

declare module 'solid-js' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface DirectiveFunctions {
            tooltip: typeof tooltip;
        }
    }
}
