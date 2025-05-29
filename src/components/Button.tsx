import type { ParentComponent } from 'solid-js';
import { createSignal } from 'solid-js';
import { tooltip } from '../directives';
import Icon from './Icon';

void tooltip;

const Button: ParentComponent<{
    icon?: string;
    tooltip?: string;
    onClick?: () => unknown;
    cta?: boolean;
    warning?: boolean;
    disabled?: boolean;
    loading?: boolean;
    classList?: Record<string, boolean>;
}> = props => {
    // eslint-disable-next-line solid/reactivity
    const [loading, setLoading] = createSignal(props.loading);

    return (
        <button
            classList={{
                'mod-warning': props.warning,
                'mod-cta': props.cta,
                'mod-loading': loading(),
                ...props.classList,
            }}
            disabled={props.disabled}
            on:click={async () => {
                if (props.disabled) return;
                const onClick = props.onClick;
                if (!onClick) return;

                setLoading(true);
                await onClick();
                setLoading(false);
            }}
            use:tooltip={props.tooltip}
        >
            {props.icon && <Icon iconId={props.icon} />}
            {props.children}
        </button>
    );
};

export default Button;
