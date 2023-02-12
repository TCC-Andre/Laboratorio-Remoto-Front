import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { consultarExperimentoApi } from "../../../services/api/experimentos";
import { useQuery } from "react-query";
import { ExperimentosConsultarDTO } from "../../GerenciarExperimentos/dtos/ExperimentoConsultarDTO";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Timer from "../../../shared/components/Timer/timer";
dayjs.extend(duration);

const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: none;
  background: ${(props) => props.theme.colors.white};
`;

const DivNav = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  background-color: #153c7a;
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

  useQuery("listar_experimentos", consultarExperimento);

  return (
    <Container>
      {loading ? (
        <DivLoading>
          <CircularProgress size={50} sx={{ color: "#153C7A" }} />
        </DivLoading>
      ) : (
        <>
          <Timer endDate={dayjs().add(1, "year").format()} />
          <iframe src={experimento?.iframe} width="100%" height="100%"></iframe>
        </>
      )}
    </Container>
  );
}
