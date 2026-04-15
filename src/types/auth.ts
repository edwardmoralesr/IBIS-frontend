export interface Menu {
    id: number;
    titulo: string;
    ruta: string;
    icono: string;
    permisos?: number[];
}
export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        documento: string;
        role: number;
    };
    menus: Menu[];
}