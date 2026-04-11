import "./Modal.css";
import { CheckmarkCircle24Regular, Warning24Regular, DismissCircle24Regular, Info24Regular } from "@fluentui/react-icons";

export type ModalType = "success" | "warning" | "error" | "info";

type Props = {
    visible: boolean;
    title?: string;
    message?: string;
    type?: ModalType;

    onAccept?: () => void;
    onCancel?: () => void;
    onClose?: () => void;

    showAccept?: boolean;
    showCancel?: boolean;
    showClose?: boolean;
};

export default function Modal({
    visible,
    title,
    message,
    type = "info",
    onAccept,
    onCancel,
    onClose,
    showAccept = false,
    showCancel = false,
    showClose = true,
}: Props) {

    const handleClose = () => {
        onClose?.();
    };

    const handleAccept = () => {
        onAccept?.();
        handleClose();
    };

    const handleCancel = () => {
        onCancel?.();
        handleClose();
    };

    const getButtonClass = () => {
        switch (type) {
            case "success":
                return "btn-success";
            case "warning":
                return "btn-warning";
            case "error":
                return "btn-error";
            default:
                return "btn-secondary";
        }
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckmarkCircle24Regular color="#22c55e" />;
            case "warning":
                return <Warning24Regular color="#f59e0b" />;
            case "error":
                return <DismissCircle24Regular color="#ef4444" />;
            default:
                return <Info24Regular color="#3b82f6" />;
        }
    };

    return (
        <div className={`overlay ${visible ? "show" : "hide"}`}>
            <div className="modal-box">

                {title && (

                    <div className="modal-header-row">
                        <div className="modal-icon">
                            {getIcon()}
                        </div>

                        <div className="modal-title">
                            {title}
                        </div>

                        <div className="modal-spacer" />
                    </div>

                )}

                <div className="modal-message">
                    {message || "Mensaje del sistema"}
                </div>

                <div className="modal-actions">

                    {showCancel && (
                        <button
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    )}

                    {showAccept && (
                        <button
                            className={`btn ${getButtonClass()}`}
                            onClick={handleAccept}
                        >
                            Aceptar
                        </button>
                    )}

                    {showClose && !showAccept && (
                        <button
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Cerrar
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}