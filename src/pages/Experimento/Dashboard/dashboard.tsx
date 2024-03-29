import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { consultarExperimentoApi } from "../../../services/api/experimentos";
import { useQuery } from "react-query";
import { ExperimentosConsultarDTO } from "../../GerenciarExperimentos/dtos/ExperimentoConsultarDTO";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Timer from "../../../shared/components/Timer/timer";
import { consultarExisteAgendamentoApi } from "../../../services/api/agendamento";
import { ExisteAgendamentoDTO } from "../Agendamento/dtos/ExisteAgendamento.dto";
dayjs.extend(duration);

const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: none;
  background: ${(props) => props.theme.colors.white};
`;

const DivLoading = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Dashboard() {
  const { id } = useParams();
  const [experimento, setExperimento] = useState<ExperimentosConsultarDTO>();
  const [loading, setLoading] = useState(true);
  const [agendamento, setAgendamento] = useState("");

  const consultarExperimento = async () => {
    const response = await consultarExperimentoApi(id!);

    const experimento = {
      id: response.data.id,
      nome: response.data.nome,
      descricao: response.data.descricao,
      dataCadastro: response.data.dataCadastro,
      duracao: response.data.duracao,
      status: response.data.status,
      iframe: response.data.iframe,
    } as ExperimentosConsultarDTO;

    setLoading(false);
    setExperimento(experimento);
  };

  const consultarExisteAgendamento = async () => {
    const payload = {
      data: dayjs().format(),
      experimentoId: id!,
    };

    const response = await consultarExisteAgendamentoApi(payload);

    if (response.status === 200) {
      setAgendamento(response.data.horarioFinal);
    }
  };

  useQuery("consultar_agendamento", consultarExisteAgendamento);
  useQuery("listar_experimentos", consultarExperimento);

  return (
    <Container>
      {loading ? (
        <DivLoading>
          <CircularProgress size={50} sx={{ color: "#153C7A" }} />
        </DivLoading>
      ) : (
        <>
          <Timer endTime={agendamento} />
          <iframe src={experimento?.iframe} width="100%" height="100%"></iframe>
        </>
      )}
    </Container>
  );
}
