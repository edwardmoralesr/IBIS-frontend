import { useNavigate } from "react-router-dom";
import { SignOut24Filled, Person24Filled } from "@fluentui/react-icons";
import "./TopBar.css";

export default function TopBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="topbar">
            <div className="topbar-left">
                <div className="user-info">
                    <Person24Filled className="user-icon" />
                    <span>{user?.Nombre || "Usuario"}</span>
                </div>
            </div>

            <div className="topbar-right">
                <button className="logout-btn" onClick={logout}>
                    <SignOut24Filled className="logout-icon" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}