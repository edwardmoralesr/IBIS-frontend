import { CircleLoader } from "react-spinners";
import "./Spinner.css";

type Props = {
    visible: boolean;
    message?: string;
};

export default function LoadingOverlay({ visible, message }: Props) {
    return (
        <div className={`overlay ${visible ? "show" : "hide"}`}>
            <div className="overlay-box">
                <CircleLoader color="gray" size={31} />
                <span>{message || "Cargando..."}</span>
            </div>
        </div>
    );
}