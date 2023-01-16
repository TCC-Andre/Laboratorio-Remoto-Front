import { api } from "./api";

export async function LoginRequest(matricula: string, senha: string) {
  const payload = { matricula, senha };

  try {
    const request = await api.post("/auth/login", payload);

    const response = { token: request.data.access_token, matricula };

    return response;
  } catch (error) {
    return null;
  }
}

export function setUserLocalStorage(user: any) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}
