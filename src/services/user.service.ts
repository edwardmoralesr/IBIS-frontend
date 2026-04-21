import { getConfig } from "../config/appConfig";

type Params = {
    page: number;
    pageSize: number;
    search: string;
};

export const getUsers = async ({ page, pageSize, search }: Params) => {
    const { apiUrl } = getConfig();
    const res = await fetch(
        `${apiUrl}/user?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    );

    if (!res.ok) throw new Error("Error al obtener usuarios");

    return res.json();
};