import type { IconName } from 'obsidian';
import { splitProps } from 'solid-js';
import type { JSX, ParentComponent } from 'solid-js';
import Icon from './Icon';

const ClickableIcon: ParentComponent<
    JSX.HTMLAttributes<HTMLDivElement> & {
        id: IconName;
        isActive?: boolean;
    }
> = props => {
    const [local, others] = splitProps(props, ['id', 'isActive', 'children', 'classList', 'class']);
    return (
        <div
            class={local.class}
            classList={{
                'clickable-icon': true,
                'is-active': local.isActive,
                ...local.classList,
            }}
            {...others}
        >
            <Icon id={local.id} />
            {local.children}
        </div>
    );
};

export default ClickableIcon;
