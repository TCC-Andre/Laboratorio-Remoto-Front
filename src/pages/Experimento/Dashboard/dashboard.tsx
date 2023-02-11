import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { consultarExperimentoApi } from "../../../services/api/experimentos";
import { useQuery } from "react-query";
import { ExperimentosConsultarDTO } from "../../GerenciarExperimentos/dtos/ExperimentoConsultarDTO";
import { CircularProgress } from "@mui/material";

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
  const [experimentos, setExperimentos] = useState<ExperimentosConsultarDTO>();
  const [loading, setLoading] = useState(true);

  const consultarExperimento = async () => {
    const response = await consultarExperimentoApi(id!);

    console.log(response.data);

    const experimentos = {
      id: response.data.id,
      nome: response.data.nome,
      descricao: response.data.descricao,
      duracao: response.data.duracao,
      status: response.data.status,
      iframe: response.data.iframe,
    } as ExperimentosConsultarDTO;

    setLoading(false);
    setExperimentos(experimentos);
  };

  useQuery("listar_experimentos", consultarExperimento);

  return (
    <Container>
      {loading ? (
        <DivLoading>
          <CircularProgress size={50} sx={{ color: "#153C7A" }} />
        </DivLoading>
      ) : (
        <iframe src={experimentos?.iframe} width="100%" height="100%"></iframe>
      )}
    </Container>
  );
}
