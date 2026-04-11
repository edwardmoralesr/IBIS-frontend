import { useState } from "react";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
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
    id: string;
    autoFocus?: string;
};

export default function Input({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    icon,
    tooltip,
    error,
    id,
    autoFocus
}: InputProps) {

    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="input-wrapper" title={tooltip}>

            {label && <label className="input-label">{label}</label>}

            <div className={`input-container ${focused ? "focused" : ""} ${error ? "error" : ""}`}>

                {icon && <span className="input-icon">{icon}</span>}

                <input
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    id={id}
                    autoFocus={autoFocus == "true" ? true : false}
                />

                {/* BOTÓN PASSWORD */}
                {isPassword && (
                    <button
                        type="button"
                        className="input-eye"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
                    </button>
                )}

            </div>

            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
}