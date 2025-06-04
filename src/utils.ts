import { Component } from 'obsidian';
import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';
import type { MountableElement } from 'solid-js/web';

export abstract class SolidComponent extends Component {
    dispose: (() => void) | null;
    containerEl: MountableElement;

    constructor(containerEl: MountableElement) {
        super();
        this.dispose = null;
        this.containerEl = containerEl;
    }

    onload() {
        this.dispose?.();
        this.dispose = render(() => this.Component(), this.containerEl);
    }

    onunload() {
        this.dispose?.();
        this.dispose = null;
    }

    abstract Component(): JSX.Element;
}
