import { createSignal, onCleanup } from 'solid-js';

export function createGlobals(el: HTMLElement) {
    const [win, setWin] = createSignal(el.win);
    const doc = () => win().document;
    const cleanup = onCleanup(el.onWindowMigrated(win => setWin(win)));
    return { win, doc, cleanup };
}
