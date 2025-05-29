import type { IconName } from 'obsidian';
import { splitProps } from 'solid-js';
import type { JSX, ParentComponent } from 'solid-js';
import Icon from './Icon';
import type { TooltipConfig } from 'src/directives';
import { tooltip } from 'src/directives';

void tooltip;

const ClickableIcon: ParentComponent<
    JSX.HTMLAttributes<HTMLDivElement> & {
        iconId: IconName;
        isActive?: boolean;
        tooltip?: TooltipConfig;
    }
> = props => {
    const [local, others] = splitProps(props, [
        'iconId',
        'isActive',
        'children',
        'classList',
        'class',
        'tooltip',
    ]);
    return (
        <div
            class={local.class}
            classList={{
                'clickable-icon': true,
                'is-active': local.isActive,
                ...local.classList,
            }}
            use:tooltip={local.tooltip}
            {...others}
        >
            <Icon iconId={local.iconId} />
            {local.children}
        </div>
    );
};

export default ClickableIcon;
