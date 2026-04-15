export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 401 || response.status === 403) {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  }

  return response;
};