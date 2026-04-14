import { useNavigate } from "react-router-dom";
import { Home24Regular,Person24Regular, Settings24Regular, PersonSettings20Regular } from "@fluentui/react-icons";
import "./SideBar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="menu-item" onClick={() => navigate("/inicio")}>
        <Home24Regular className="icon" />
        <span className="label">Inicio</span>
      </div>
      <div className="menu-item" onClick={() => navigate("/perfil")}>
        <PersonSettings20Regular className="icon" />
        <span className="label">Actualizar Perfil</span>
      </div>
      <div className="menu-item" onClick={() => navigate("/configuracion")}>
        <Settings24Regular className="icon" />
        <span className="label">Configuración General</span>
      </div>
      <div className="menu-item" onClick={() => navigate("/usuario")}>
        <Person24Regular className="icon" />
        <span className="label">Usuario</span>
      </div>
    </div>
  );
}