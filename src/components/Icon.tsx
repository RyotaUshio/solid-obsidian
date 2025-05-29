import { getIcon } from 'obsidian';
import type { IconName } from 'obsidian';
import type { Component } from 'solid-js';

const Icon: Component<{
    iconId: IconName;
}> = props => {
    return <>{getIcon(props.iconId)}</>;
};

export default Icon;
