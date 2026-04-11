import TopBar from "../TopBar/TopBar";
import Sidebar from "../SideBar/SideBar";
import "./Layout.css";

export default function Layout({ children }: any) {
  return (
    <div className="layout">
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