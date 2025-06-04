import { tooltip } from '@/directives';
import type { TooltipConfig } from '@/directives';
import type { IconName } from 'obsidian';
import type { JSX } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import Icon from './Icon';

void tooltip;

export default function TextIconButton(
    props: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> & {
        iconId: IconName;
        label: string;
        auxIcon?: boolean | IconName;
        tooltip?: TooltipConfig;
    },
) {
    const [local, others] = splitProps(props, [
        'iconId',
        'label',
        'auxIcon',
        'classList',
        'tooltip',
    ]);

    return (
        <div
            classList={{
                'text-icon-button': true,
                ...local.classList,
            }}
            tabIndex={0}
            use:tooltip={local.tooltip}
            {...others}
        >
            <span class="text-button-icon">
                <Icon iconId={local.iconId} />
            </span>
            <span class="text-button-label">{local.label}</span>
            <Show when={local.auxIcon}>
                <span class="text-button-icon mod-aux">
                    <Icon
                        iconId={
                            typeof local.auxIcon === 'string'
                                ? local.auxIcon
                                : 'lucide-chevrons-up-down'
                        }
                    />
                </span>
            </Show>
        </div>
    );
}
