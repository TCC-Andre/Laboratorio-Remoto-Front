import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { consultarExperimentoApi } from "../../services/api/experimentos";
import { ExperimentosListarDTO } from "../GerenciarExperimentos/dtos/ExperimentosListarDTO";
import { Button, CardMedia, Grid, Paper } from "@mui/material";
import { arrayBufferToBase64 } from "../../services/utils";
import Title from "../../shared/components/Title/Title";
import Text from "../../shared/components/Text/Text";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import { SlCalender } from "react-icons/sl";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { consultarExisteAgendamentoApi } from "../../services/api/agendamento";
import { ExisteAgendamentoDTO } from "./Agendamento/dtos/ExisteAgendamento.dto";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  padding: 5%;
`;

const DivButton = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding-bottom: 30px;
`;

const DivInline = styled.div`
  width: 100%;
  display: inline-flex;
  gap: 10px;
  padding-bottom: 20px;
`;

export function Experimento() {
  const { id } = useParams();
  const [experimento, setExperimento] = useState<ExperimentosListarDTO | null>(
    null
  );
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const consultarExperimento = async () => {
    const response = await consultarExperimentoApi(id!);

    if (response.status === 200) {
      setExperimento(response.data);
    }
  };

  useQuery("consultar_experimento", consultarExperimento);

  const consultarExisteAgendamento = async () => {
    const payload = {
      data: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      experimentoId: id!,
    };

    const response = await consultarExisteAgendamentoApi(payload);

    return response;
  };

  const handleAcessarExperimento = async () => {
    const response = await consultarExisteAgendamento();

    if (response.status === 201) {
      const id = response.data.aluno.id;
      if (id === auth.user?.id) {
        navigate("dashboard");
      } else {
        toast.error("Existe um aluno agendamento para este experimento!");
      }
    }
    if (response.status === 200) {
      navigate("dashboard");
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={7}>
          <Paper sx={{ padding: "50px", minHeight: "400px" }}>
            <Title fontSize={38} fontWeight={600} marginBottom="20px">
              {experimento?.nome}
            </Title>
            <DivButton>
              <PrimaryButton
                handleClick={handleAcessarExperimento}
                width="120px"
                height="40px"
                fontSize="14px"
              >
                ACESSAR
              </PrimaryButton>
              {!auth.user?.isAdmin && (
                <Button
                  onClick={() => navigate("agendamento")}
                  variant="contained"
                  endIcon={<SlCalender color="#ffbb18" />}
                  sx={{
                    borderRadius: "12px",
                    background: "#153C7A",
                    width: "140px",
                  }}
                >
                  Agendar
                </Button>
              )}
            </DivButton>
            <DivInline>
              <Text fontSize={18} fontWeight={800}>
                Descrição:
              </Text>
              <Text fontSize={18} fontWeight={400} color="#444">
                {experimento?.descricao}
              </Text>
            </DivInline>
            <DivInline>
              <Text fontSize={18} fontWeight={800}>
                Duração:
              </Text>
              <Text fontSize={18} fontWeight={400} color="#444">
                {experimento?.duracao} minutos
              </Text>
            </DivInline>
          </Paper>
        </Grid>
        <Grid xs={5}>
          <Paper>
            <CardMedia
              component="img"
              height="400"
              image={
                "data:image/jpeg;base64," +
                arrayBufferToBase64(experimento?.imagem.data)
              }
              alt="green iguana"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Experimento;
