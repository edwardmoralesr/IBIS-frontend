import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import Inicio from "../pages/inicio/inicio";
import Usuario from "../pages/usuario/usuario";

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
                    <Route
                        path="/usuario"
                        element={
                            <Layout>
                                <Usuario />
                            </Layout>
                        }
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}