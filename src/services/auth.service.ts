import type { LoginResponse } from "../types/auth";
import { getConfig } from "../config/appConfig";

export type ApiResult<T> = {
    data?: T;
    message: string;
    status: number;
};

export const loginRequest = async (
    Documento: string,
    Password: string,
    Role: boolean
): Promise<ApiResult<LoginResponse>> => {

    const { apiUrl } = getConfig();

    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Documento, Password, Role }),
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        return {
            data: response.ok ? data : undefined,
            status: response.status,
            message:
                data?.error ||
                data?.message ||
                getDefaultMessage(response.status),
        };

    } catch {
        return {
            status: 500,
            message: "Error procesando la información",
        };
    }
};

const getDefaultMessage = (status: number) => {
    switch (status) {
        case 401:
            return "Credenciales incorrectas";
        case 500:
            return "Error interno del servidor";
        default:
            return "Ocurrió un error";
    }
};