import { tooltip } from '../directives';
import type { Ref } from 'solid-js';
import type { TooltipConfig } from '../directives';
import Icon from './Icon';

// Even if I use these directives (`use:tooltip`), TypeScript is not smart enough
// to know that they are actually used. As a result, the `icon` and `tooltip` imports are deleted
// every time I run the "Organize imports" command. So I'm just going to use a void assignment to make it happy.
// See also https://docs.solidjs.com/configuration/typescript#addressing-import-issues-with-directives
void tooltip;

export default function ExtraButton(props: {
    disabled?: boolean;
    onClick?: () => void;
    icon?: string;
    tooltip?: TooltipConfig;
    ref?: Ref<HTMLDivElement>;
    classList?: Record<string, boolean>;
}) {
    return (
        <div
            ref={props.ref}
            classList={{
                'clickable-icon': true,
                'extra-setting-button': true,
                'is-disabled': props.disabled,
                ...props.classList,
            }}
            onClick={() => {
                if (!props.disabled) {
                    props.onClick?.();
                }
            }}
            use:tooltip={props.tooltip}
        >
            <Icon iconId={props.icon ?? 'lucide-settings'} />
        </div>
    );
}
