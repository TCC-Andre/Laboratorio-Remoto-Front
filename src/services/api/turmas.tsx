import { TurmasCadastrarDTO } from "../../pages/GerenciarTurmas/dtos/TurmasCadastrarDTO";
import { api } from "./api";

export const cadastrarTurmaApi = async (turma: TurmasCadastrarDTO) => {
  return await api
    .post("/turmas", turma)
    .then((response) => response)
    .catch((error) => error.response);
};

export const editarTurmaApi = async (id: string, turma: Object) => {
  return await api
    .put("/turmas/" + id, turma)
    .then((response) => response)
    .catch((error) => error.response);
};

export const deletarTurmaApi = async (id: string) => {
  return await api
    .delete("/turmas/" + id)
    .then((response) => response)
    .catch((error) => error.response);
};
