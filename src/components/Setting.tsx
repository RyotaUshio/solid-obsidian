import type { JSX, Ref } from 'solid-js';

export default function Setting(props: {
    name?: string | JSX.Element;
    desc?: string | JSX.Element;
    children?: JSX.Element;
    isHeading?: boolean;
    classList?: Record<string, boolean>;
    ref?: Ref<HTMLDivElement>;
    infoRef?: Ref<HTMLDivElement>;
    nameRef?: Ref<HTMLDivElement>;
    descRef?: Ref<HTMLDivElement>;
    controlRef?: Ref<HTMLDivElement>;
}) {
    return (
        <div
            ref={props.ref}
            classList={{
                'setting-item': true,
                'setting-item-heading': props.isHeading ?? false,
                ...props.classList,
            }}
        >
            <div ref={props.infoRef} class="setting-item-info">
                <div ref={props.nameRef} class="setting-item-name">
                    {props.name}
                </div>
                <div ref={props.descRef} class="setting-item-description">
                    {props.desc}
                </div>
            </div>
            <div ref={props.controlRef} class="setting-item-control">
                {props.children}
            </div>
        </div>
    );
}
