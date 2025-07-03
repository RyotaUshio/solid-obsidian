import type { App } from 'obsidian';
import { Component, MarkdownRenderer } from 'obsidian';
import type { Accessor } from 'solid-js';
import { createResource, onCleanup, onMount, Suspense } from 'solid-js';

type FetchMarkdownSource = {
    app: App;
    markdown: string;
    sourcePath: string;
    component: Component;
};

async function fetchMarkdown(source: FetchMarkdownSource) {
    const container = createDiv();
    await MarkdownRenderer.render(
        source.app,
        source.markdown,
        container,
        source.sourcePath,
        source.component,
    );
    return container;
}

export function RenderMarkdown(props: { app: App; markdown: string; sourcePath: string }) {
    const component = new Component();
    onMount(() => {
        component.load();
        onCleanup(() => {
            component.unload();
        });
    });

    const source: Accessor<FetchMarkdownSource> = () => ({
        app: props.app,
        markdown: props.markdown,
        sourcePath: props.sourcePath,
        component,
    });
    const [rendered] = createResource(source, fetchMarkdown);

    return <>{rendered()}</>;
}

/** Render markdown and prevent layout shift */
export function Markdown(props: { app: App; markdown: string; sourcePath: string }) {
    return (
        <Suspense fallback={<div style={{ color: 'transparent' }}>{props.markdown}</div>}>
            <div class="markdown-rendered">
                <RenderMarkdown
                    app={props.app}
                    markdown={props.markdown}
                    sourcePath={props.sourcePath}
                />
            </div>
        </Suspense>
    );
}
