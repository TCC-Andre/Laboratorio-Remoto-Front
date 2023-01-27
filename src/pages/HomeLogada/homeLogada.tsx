/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import Text from "../../shared/components/Text/Text";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { ExperimentosListarDTO } from "../Experimentos/dtos/ExperimentosListarDTO";
import { api } from "../../services/api/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2% 4%;
  gap: 2%;
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

const DivLoading = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function HomeLogada(props: any) {
  const [experimentos, setExperimentos] = useState<ExperimentosListarDTO[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    setLoading(false);
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
          {!loading ? (
            <>
              {experimentos?.map(
                (experimento: ExperimentosListarDTO, index) => {
                  return (
                    <Card
                      sx={{
                        maxWidth: 400,
                        minWidth: 400,
                        paddingBottom: "5px",
                      }}
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
                      <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <PrimaryButton
                          width="150px"
                          height="45px"
                          fontSize="16px"
                          handleClick={() => navigate(experimento.id)}
                        >
                          Acessar
                        </PrimaryButton>
                      </CardActions>
                    </Card>
                  );
                }
              )}
            </>
          ) : (
            <DivLoading>
              <CircularProgress size={50} sx={{ color: "#153C7A" }} />
            </DivLoading>
          )}
        </DivCards>
      </Container>
    </div>
  );
}
