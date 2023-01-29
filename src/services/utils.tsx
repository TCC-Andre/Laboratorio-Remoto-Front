import { ErrorResponse } from "@remix-run/router";
import { api } from "./api/api";

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
        id: request.data.id,
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

export const arrayBufferToBase64 = (buffer: any) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
