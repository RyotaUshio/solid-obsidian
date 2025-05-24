import { getIcon } from 'obsidian';

export default function MenuItem(props: { icon?: string; title?: string; onClick?: () => void }) {
    return (
        <div class="menu-item" onClick={() => props.onClick?.()}>
            <div class="menu-item-icon">{props.icon && getIcon(props.icon)}</div>
            <div class="menu-item-title">{props.title}</div>
        </div>
    );
}
