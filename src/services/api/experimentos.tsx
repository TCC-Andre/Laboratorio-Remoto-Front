// import { ExperimentosCadastrarDTO } from "../../pages/Experimentos/dtos/ExperimentosCadastrarDTO";
import { ExperimentoCadastrarDTO } from "../../pages/Experimentos/dtos/ExperimentoCadastrarDTO";
import { api } from "./api";

export const cadastrarExperimentoApi = async (
  experimento: ExperimentoCadastrarDTO
) => {
  return await api
    .post("/experimentos", experimento)
    .then((response) => response);
};

export const editarExperimentoApi = async (id: string, turma: Object) => {
  return await api
    .put("/experimentos/" + id, turma)
    .then((response) => response);
};

export const deletarExperimentoApi = async (id: string) => {
  return await api.delete("/experimentos/" + id).then((response) => response);
};
