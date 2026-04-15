import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
    const token = localStorage.getItem("token");
    const menus = JSON.parse(localStorage.getItem("menus") || "[]");
    const location = useLocation();

    if (!token) return <Navigate to="/" replace />;

    const normalize = (p: string) =>
        p.split("?")[0].replace(/\/+$/, "");

    const current = normalize(location.pathname);

    const hasAccess = menus.some((m: any) =>
        normalize(m.ruta) === current
    );

    if (!hasAccess) return <Navigate to="/inicio" replace />;

    return <Outlet />;
}