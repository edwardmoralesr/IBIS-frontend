export type AppConfig = {
    apiUrl: string;
};

let config: AppConfig;// | null = null;

export const loadConfig = async (): Promise<AppConfig> => {
    if (config) return config;

    const response = await fetch("/config.json");
    config = await response.json();

    return config;
};

export const getConfig = () => {
    if (!config) {
        throw new Error("Config no cargada aún");
    }
    return config;
};