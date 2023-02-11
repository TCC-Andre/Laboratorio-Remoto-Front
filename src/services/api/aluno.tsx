import { api } from "./api";

export const consultarExperimentosPorAlunoApi = async (id: string) => {
  return await api
    .get("/experimentos/aluno/" + id)
    .then((response) => response)
    .catch((error) => error.response);
};
