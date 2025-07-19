import { children, onMount, splitProps, type JSX } from 'solid-js';

export default function Search(props: JSX.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => unknown;
    rightDecorator?: JSX.Element;
    autoSelect?: boolean;
}) {
    let inputEl: HTMLInputElement | undefined;
    const [local, other] = splitProps(props, ['value', 'placeholder', 'disabled', 'onInput', 'autoSelect', 'rightDecorator']);

    const rightDecorator = children(() => local.rightDecorator);
    const rightDecoratorEl = rightDecorator.toArray()[0];
    if (rightDecoratorEl && typeof rightDecoratorEl === 'object' && 'addClass' in rightDecoratorEl) {
        (rightDecoratorEl as HTMLElement).addClass('input-right-decorator');
    }

    onMount(() => {
        if (local.autoSelect && inputEl) {
            const select = () => {
                inputEl.focus();
                inputEl.select();
            };
            if (inputEl.isShown()) {
                select();
            } else {
                inputEl.onNodeInserted(select, true);
            }
        }
    });

    return (
        <div class='search-input-container' {...other}>
            <input
                type='search'
                enterkeyhint='search'
                spellcheck={false}
                placeholder={local.placeholder}
                disabled={local.disabled}
                value={local.value ?? ''}
                on:input={e => local.onInput?.(e.target.value)}
                ref={inputEl}
            />
            <div
                class='search-input-clear-button'
                on:mousedown={e => e.preventDefault()}
                on:click={() => {
                    if (local.disabled) return;
                    if (!inputEl) return;
                    inputEl.value = '';
                    local.onInput?.('');
                    inputEl.focus();
                }}
            />
            {rightDecorator()}
        </div>
    );
}
