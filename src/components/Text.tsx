import type { Ref } from 'solid-js';

export default function Text(props: {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => unknown;
    onChange?: (value: string) => unknown;
    classList?: Record<string, boolean>;
    ref?: Ref<HTMLInputElement>;
}) {
    return (
        <input
            ref={props.ref}
            type="text"
            spellcheck={false}
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={props.value}
            classList={props.classList}
            on:input={e => props.onInput?.(e.target.value)}
            on:change={e => props.onChange?.(e.target.value)}
            on:keydown={e => {
                if (!e.isComposing && !e.defaultPrevented && e.key === 'Enter') {
                    (e.target as HTMLInputElement).blur();
                }
            }}
        />
    );
}
