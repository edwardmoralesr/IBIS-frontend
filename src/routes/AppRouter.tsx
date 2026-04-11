import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import Inicio from "../pages/inicio/inicio";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Pública */}
                <Route path="/" element={<Login />} />

                {/* Privadas */}
                <Route element={<PrivateRoute />}>

                    <Route
                        path="/inicio"
                        element={
                            <Layout>
                                <Inicio />
                            </Layout>
                        }
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}