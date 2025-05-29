import { getIcon } from 'obsidian';
import type { IconName } from 'obsidian';
import type { Component } from 'solid-js';

const Icon: Component<{
    id: IconName;
}> = props => {
    return <>{getIcon(props.id)}</>;
};

export default Icon;
