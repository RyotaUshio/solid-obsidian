import type { Ref } from 'solid-js';

export default function TextArea(props: {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => unknown;
    onChange?: (value: string) => unknown;
    classList?: Record<string, boolean>;
    ref?: Ref<HTMLTextAreaElement>;
}) {
    return (
        <textarea
            ref={props.ref}
            spellcheck={false}
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={props.value}
            classList={props.classList}
            on:input={e => props.onInput?.(e.target.value)}
            on:change={e => props.onChange?.(e.target.value)}
        />
    );
}
