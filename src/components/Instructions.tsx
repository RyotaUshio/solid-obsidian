import { type Instruction } from 'obsidian';
import { For, splitProps, type JSX } from 'solid-js';

export default function Instructions(props: JSX.HTMLAttributes<HTMLDivElement> & {
    instructions: Instruction[];
}) {
    const [local, others] = splitProps(props, ['instructions']);
    return (
        <div class='prompt-instructions' {...others}>
            <For each={local.instructions}>
                {instruction => (
                    <div class='prompt-instruction'>
                        <span class='prompt-instruction-command'>{instruction.command}</span>
                        <span>{instruction.purpose}</span>
                    </div>
                )}
            </For>
        </div>
    );
}
