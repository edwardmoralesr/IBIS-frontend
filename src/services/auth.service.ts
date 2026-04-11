import type { LoginResponse } from "../types/auth";
import { getConfig } from "../config/appConfig";

export const loginRequest = async (
    Documento: string,
    Password: string
): Promise<LoginResponse> => {
    const { apiUrl } = getConfig();
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Documento, Password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error en login");
    }

    return data;
};