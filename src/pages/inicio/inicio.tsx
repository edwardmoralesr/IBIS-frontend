import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/fetch";
import { getConfig } from "../../config/appConfig";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const { apiUrl } = getConfig();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        const getPerfil = async () => {
            const response = await fetchWithAuth(
                `${apiUrl}/user/perfil`
            );

            const data = await response.json();
            setUser(data.user);
        };

        getPerfil();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>

            {user && (
                <div>

                </div>
            )}
        </div>
    );
}