import { ErrorResponse } from "@remix-run/router";
import { AxiosError } from "axios";
import { api } from "./api";

export async function LoginRequest(
  matricula: string,
  senha: string
): Promise<any> {
  const payload = { matricula, senha };

  try {
    const request = await api.post("/auth/login", payload);

    if (request.status === 201) {
      const response = {
        token: request.data.access_token,
        matricula,
        isAdmin: request.data.isAdmin,
      };
      return response;
    }
  } catch (error) {
    // console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ErrorResponse(401, "Unauthorized", error);
  }
}

export async function LoginRequestAdmin(matricula: string, senha: string) {
  const payload = { matricula, senha };

  try {
    const request = await api.post("/auth/admin/login", payload);

    if (request.status === 200) {
      const response = { token: request.data.access_token, matricula };
      return response;
    }
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
