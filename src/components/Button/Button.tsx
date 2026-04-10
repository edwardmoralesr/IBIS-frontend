import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
};

export default function Button({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    icon,
    fullWidth = false
}: ButtonProps) {

    return (
        <button
            className={`btn ${variant} ${size} ${fullWidth ? "full" : ""}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className="spinner" />
            ) : (
                <>
                    {icon && <span className="icon">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}