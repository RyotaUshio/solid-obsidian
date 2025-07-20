import { renderResults, type SearchResult } from 'obsidian';
import { type JSX, splitProps } from 'solid-js';

export default function RenderResults(props: JSX.HTMLAttributes<HTMLDivElement> & {
    text: string;
    result: SearchResult;
    offset?: number;
}) {
    const [local, others] = splitProps(props, ['text', 'result', 'offset']);
    return (
        <div {...others} ref={el => {
            renderResults(el, local.text, local.result, local.offset);
        }} />
    );
}
