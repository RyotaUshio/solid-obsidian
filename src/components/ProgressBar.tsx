export default function ProgressBar(props: { value: number; hidden?: boolean }) {
    return (
        <div class="setting-progress-bar" hidden={props.hidden}>
            <div
                class="setting-progress-bar-inner"
                style={{
                    width: `${Math.clamp(props.value, 0, 100)}%`,
                }}
            />
        </div>
    );
}
