import type { Accessor } from 'solid-js';
import { createRenderEffect } from 'solid-js';
import type { TooltipOptions } from 'obsidian';
import { setIcon, setTooltip } from 'obsidian';

export function icon(parent: Element, iconId: Accessor<string | undefined>) {
    createRenderEffect(() => {
        const id = iconId();
        if (id) {
            setIcon(parent as HTMLElement, id);
        }
    });
}

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
            icon: typeof icon;
            tooltip: typeof tooltip;
        }
    }
}
