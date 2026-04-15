import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { icon } from "../../utils/icon";

export default function Sidebar() {
  const navigate = useNavigate();
  const menus = JSON.parse(localStorage.getItem("menus") || "[]");

  return (
    <div className="sidebar">
      {menus.map((menu: any) => {
        const Icon = icon[menu.icono];

        return (
          <div
            key={menu.id}
            className="menu-item"
            onClick={() => navigate(menu.ruta)}
          >
            {Icon && <Icon className="icon" />}

            <span className="label">
              {menu.titulo}
            </span>
          </div>
        );
      })}
    </div>
  );
}