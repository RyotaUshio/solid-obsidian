import { createEffect, For } from 'solid-js';

function Dropdown<T extends string>(props: {
    options: Record<T, string>;
    value: T;
    onChange?: (value: T) => void;
    disabled?: boolean;
    classList?: Record<string, boolean>;
}) {
    return (
        <select
            classList={{
                dropdown: true,
                ...props.classList,
            }}
            ref={el => {
                createEffect(() => {
                    if (props.options.hasOwnProperty(props.value)) {
                        el.value = props.value;
                    }
                });
            }}
            disabled={props.disabled}
            on:change={e => props.onChange?.(e.target.value as T)}
        >
            <For each={Object.entries<string>(props.options)}>
                {entry => {
                    const [value, text] = entry;
                    return <option value={value}>{text}</option>;
                }}
            </For>
        </select>
    );
}

export default Dropdown;
