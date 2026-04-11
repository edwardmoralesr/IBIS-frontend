export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        documento: string;
        role: number;
    };
}