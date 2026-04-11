import { useState } from "react";
import { Home24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`sidebar ${open ? "open" : "closed"}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="menu">
        <div className="menu-item" onClick={() => navigate("/inicio")}>
          <Home24Regular />
          {open && <span>Inicio</span>}
        </div>
      </div>
    </div>
  );
}