export type ModalType = "success" | "warning" | "error" | "info";

export const getModalTypeByStatus = (status: number): ModalType => {
    if (status >= 200 && status < 300) return "success";
    if (status === 401 || status === 403) return "warning";
    if (status >= 500) return "error";
    return "info";
};

export const buildModalFromResponse = (res: {
    status: number;
    message: string;
}) => ({
    visible: true,
    type: getModalTypeByStatus(res.status),
    title: res.status < 300 ? "Éxito" : "Error",
    message: res.message,
    showAccept: res.status < 300,
    showClose: res.status >= 400,
    showCancel: res.status < 300 && res.status > 200
});