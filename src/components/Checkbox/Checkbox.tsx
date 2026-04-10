import "./Checkbox.css";

type SwitchProps = {
    label?: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
};

export default function Switch({
    label,
    checked = false,
    onChange,
    disabled = false
}: SwitchProps) {

    return (
        <div className="switch-wrapper">

            <label className={`switch ${disabled ? "disabled" : ""}`}>

                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange?.(e.target.checked)}
                />

                <span className="slider"></span>

            </label>

            {label && <span className="switch-label">{label}</span>}

        </div>
    );
}