import { useState } from "react";
import "./Input.css";

type InputProps = {
    label?: string;
    placeholder?: string;
    type?: "text" | "password" | "email";
    value?: string;
    onChange?: (value: string) => void;
    icon?: React.ReactNode;
    tooltip?: string;
    error?: string;
};

export default function Input({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    icon,
    tooltip,
    error
}: InputProps) {

    const [focused, setFocused] = useState(false);

    return (
        <div className="input-wrapper" title={tooltip}>

            {label && <label className="input-label">{label}</label>}

            <div className={`input-container ${focused ? "focused" : ""} ${error ? "error" : ""}`}>

                {icon && <span className="input-icon">{icon}</span>}

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />

            </div>

            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
}