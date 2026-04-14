import { getConfig } from "../config/appConfig";

export const getMenus = async (token: string) => {
    const { apiUrl } = getConfig();
    const res = await fetch(`${apiUrl}/menus`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error obteniendo menús");
    }

    return res.json();
};