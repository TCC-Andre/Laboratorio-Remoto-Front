// import { ExperimentosCadastrarDTO } from "../../pages/Experimentos/dtos/ExperimentosCadastrarDTO";
import { ExperimentoCadastrarDTO } from "../../pages/GerenciarExperimentos/dtos/ExperimentoCadastrarDTO";
import { api } from "./api";

export const cadastrarExperimentoApi = async (
  experimento: ExperimentoCadastrarDTO,
  formData: FormData
) => {
  return await api
    .post("/experimentos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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

export const consultarExperimentoApi = async (id: string) => {
  return await api.get("/experimentos/" + id).then((response) => response);
};
