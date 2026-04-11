import { useNavigate } from "react-router-dom";
import { Home24Regular } from "@fluentui/react-icons";
import "./SideBar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="menu-item" onClick={() => navigate("/inicio")}>
        <Home24Regular className="icon" />
        <span className="label">Inicio</span>
      </div>
    </div>
  );
}