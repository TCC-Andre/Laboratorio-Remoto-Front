/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import Text from "../../shared/components/Text/Text";
import Title from "../../shared/components/Title/Title";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ExperimentosListarDTO } from "../Experimentos/dtos/ExperimentosListarDTO";
import { api } from "../../services/api/api";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2% 4%;
  gap: 2%;
`;

const DivContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding-top: 40px;
`;

const DivCards = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 40px;
  padding-top: 40px;
  flex-wrap: wrap;
`;

export function HomeLogada(props: any) {
  const [experimentos, setExperimentos] = useState<ExperimentosListarDTO[]>();

  const listarExperimentos = async () => {
    const response = await api.get("experimentos/");

    const experimentos = response.data.map((value: ExperimentosListarDTO) => {
      return {
        id: value.id,
        nome: value.nome,
        descricao: value.descricao,
        duracao: value.duracao,
        status: value.status,
        imagem: value.imagem,
      };
    });

    setExperimentos(experimentos);
  };

  useQuery("listar_experimentos", listarExperimentos);

  const arrayBufferToBase64 = (buffer: any) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div>
      <Container>
        <DivCards>
          {experimentos?.map((experimento: ExperimentosListarDTO, index) => {
            return (
              <Card
                sx={{ maxWidth: 400, minWidth: 400, paddingBottom: "15px" }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    "data:image/jpeg;base64," +
                    arrayBufferToBase64(experimento.imagem.data)
                  }
                  alt="green iguana"
                  key={index}
                />
                <CardContent>
                  <Text fontSize={24} fontWeight={500} color="#283750">
                    {experimento.nome}
                  </Text>
                  <Text
                    fontSize={15}
                    fontWeight={400}
                    color="grey"
                    marginTop="5px"
                  >
                    {experimento.descricao}
                  </Text>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton width="150px" height="45px" fontSize="16px">
                    Acessar
                  </PrimaryButton>
                  <PrimaryButton width="150px" height="45px" fontSize="16px">
                    Agendar
                  </PrimaryButton>
                </CardActions>
              </Card>
            );
          })}
        </DivCards>
      </Container>
    </div>
  );
}
