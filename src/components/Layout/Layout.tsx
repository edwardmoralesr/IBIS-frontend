import { useEffect, useState } from "react";
import TopBar from "../TopBar/TopBar";
import Sidebar from "../SideBar/SideBar";
import "./Layout.css";

export default function DashboardLayout({ children }: any) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`layout ${loaded ? "layout-fade-in" : ""}`}>
      <Sidebar />

      <div className="main">
        <TopBar />

        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}