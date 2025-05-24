import { setIcon } from 'obsidian';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';

/**
 * Note that you have to add the "markdown-rendered" class to the parent element to
 * ensure it looks the same as in Reading view.
 */
const CodeBlock: Component<{
    copyButton?: boolean;
    children: string;
}> = props => (
    <pre>
        <code>{props.children}</code>
        <Show when={props.copyButton}>
            <button
                class="copy-code-button"
                ref={buttonEl => {
                    setIcon(buttonEl, 'lucide-copy');

                    buttonEl.addEventListener('click', async evt => {
                        evt.preventDefault();

                        await navigator.clipboard.writeText(props.children);

                        setIcon(buttonEl, 'lucide-check');
                        buttonEl.setCssStyles({
                            color: 'var(--text-success)',
                            display: 'inline-flex',
                        });

                        setTimeout(() => {
                            setIcon(buttonEl, 'lucide-copy');
                            buttonEl.setCssStyles({
                                color: '',
                                display: '',
                            });
                        }, 1000);
                    });
                }}
            />
        </Show>
    </pre>
);

export default CodeBlock;
