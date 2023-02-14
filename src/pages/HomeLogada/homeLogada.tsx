/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
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
import { ExperimentosListarDTO } from "../GerenciarExperimentos/dtos/ExperimentosListarDTO";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { arrayBufferToBase64 } from "../../services/utils";
import { consultarExperimentosPorAlunoApi } from "../../services/api/aluno";
import { AuthContext } from "../../context/AuthProvider";
import { listarExperimentosApi } from "../../services/api/experimentos";

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
  const auth = useContext(AuthContext);

  const listarExperimentos = async () => {
    if (auth.user?.isAdmin === true) {
      const response = await listarExperimentosApi(auth.user?.id!);

      const experimentos = response.data.map((value: ExperimentosListarDTO) => {
        return {
          id: value.id,
          nome: value.nome,
          descricao: value.descricao,
          duracao: value.duracao,
          status: value.status,
          imagem: value.imagem,
          iframe: value.iframe,
        };
      });

      setLoading(false);
      setExperimentos(experimentos);
    } else {
      const response = await consultarExperimentosPorAlunoApi(auth.user?.id!);

      const experimentos = response.data.map((value: ExperimentosListarDTO) => {
        return {
          id: value.id,
          nome: value.nome,
          descricao: value.descricao,
          duracao: value.duracao,
          status: value.status,
          imagem: value.imagem,
          iframe: value.iframe,
        };
      });

      setLoading(false);
      setExperimentos(experimentos);
    }
  };

  useQuery("listar_experimentos", listarExperimentos);

  return (
    <div>
      <Container>
        <DivCards>
          {!loading ? (
            <>
              {experimentos?.length === 0 ? (
                <Text fontSize={24} fontWeight={500} color="#283750">
                  Você ainda não possui experimentos cadastrados.
                </Text>
              ) : (
                <>
                  {experimentos?.map(
                    (experimento: ExperimentosListarDTO, index) => {
                      return (
                        <Card
                          key={index}
                          sx={{
                            maxWidth: 600,
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
                            <Text
                              fontSize={24}
                              fontWeight={500}
                              color="#283750"
                            >
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
                              width="130px"
                              height="40px"
                              fontSize="14px"
                              handleClick={() => navigate(experimento.id)}
                            >
                              ACESSAR
                            </PrimaryButton>
                          </CardActions>
                        </Card>
                      );
                    }
                  )}
                </>
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
