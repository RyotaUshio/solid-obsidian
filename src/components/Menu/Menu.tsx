import type { MenuPositionDef } from 'obsidian';
import type { ParentProps } from 'solid-js';
import { Portal } from 'solid-js/web';

export default function Menu(
    props: ParentProps<{
        position: MenuPositionDef;
        document?: Document;
    }>,
) {
    return (
        <Portal mount={props.document?.body}>
            <div
                class="menu"
                style={{
                    left: props.position.x + 'px',
                    top: props.position.y + 'px',
                }}
            >
                <div class="menu-grabber" />
                <div class="menu-scroll">{props.children}</div>
            </div>
        </Portal>
    );
}
