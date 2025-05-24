export default function Color(props: {
    value: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}) {
    return (
        <input
            type="color"
            value={props.value}
            onChange={e => props.onChange?.(e.target.value)}
            disabled={props.disabled}
        />
    );
}
