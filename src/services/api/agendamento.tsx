import { AgendamentoCadastrarDTO } from "../../pages/Experimento/Agendamento/dtos/AgendamentoCadastrar.dto";
import { api } from "./api";

export const consultarHorariosDisponiveis = async (payload: object) => {
  return await api
    .post("/agendamentos/horarios-disponiveis", payload)
    .then((response) => response);
};

export const cadastrarAgendamentoApi = async (
  payload: AgendamentoCadastrarDTO
) => {
  return await api
    .post("/agendamentos", payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const consultarExisteAgendamentoApi = async (payload: {
  data: string;
  experimentoId: string;
}) => {
  return await api
    .post("/agendamentos/existe-agendamento", payload)
    .then((response) => response)
    .catch((error) => error.response);
};
