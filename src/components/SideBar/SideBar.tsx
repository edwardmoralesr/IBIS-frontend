import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { getMenus } from "../../services/menu.service";
import { icon } from "../../utils/icon";

export default function Sidebar() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMenus(token!);
        setMenus(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenus();
  }, []);

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
            <span className="label">{menu.titulo}</span>
          </div>
        );
      })}
    </div>
  );
}