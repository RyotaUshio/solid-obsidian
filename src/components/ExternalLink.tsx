import type { ParentComponent } from 'solid-js';
import { tooltip } from '../directives';

void tooltip;

const ExternalLink: ParentComponent<{
    url: string;
}> = props => (
    <a
        class="external-link"
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        use:tooltip={props.url}
    >
        {props.children}
    </a>
);

export default ExternalLink;
