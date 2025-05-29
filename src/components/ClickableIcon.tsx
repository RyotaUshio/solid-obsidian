import type { IconName } from 'obsidian';
import type { ParentComponent } from 'solid-js';
import Icon from './Icon';

const ClickableIcon: ParentComponent<{
    id: IconName;
    isActive?: boolean;
}> = props => {
    return (
        <div
            classList={{
                'clickable-icon': true,
                'is-active': props.isActive,
            }}
        >
            <Icon id={props.id} />
            {props.children}
        </div>
    );
};

export default ClickableIcon;
