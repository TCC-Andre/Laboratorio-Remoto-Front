import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import Title from "../../../shared/components/Title/Title";
import Text from "../../../shared/components/Text/Text";
import dayjs from "dayjs";
import PrimaryButton from "../../../shared/components/PrimaryButton/PrimaryButton";
import {
  cadastrarAgendamentoApi,
  consultarHorariosDisponiveis,
} from "../../../services/api/agendamento";
import { AgendamentoCadastrarDTO } from "./dtos/AgendamentoCadastrar.dto";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  padding: 5%;
`;

const DataCarrosel = styled.ul`
  width: 100%;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: row;
  gap: 2px;
  padding: 30px 0;
`;

const HoraCarrosel = styled.ul`
  width: auto;
  max-width: 700px;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: row;
  gap: 2px;
  flex-wrap: wrap;
  padding-bottom: 30px;
`;

const Item = styled(({ active, ...props }) => <li {...props} />)`
  width: 70px;
  height: 70px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  background: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.black};
`;

const ItemHora = styled(({ active, ...props }) => <Item {...props} />)`
  height: 50px;
  font-size: 16px;
  background: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.black};
`;

const data = [
  { key: "dia1", value: dayjs().format() },
  { key: "dia2", value: dayjs().add(1, "day").startOf("day").format() },
  { key: "dia3", value: dayjs().add(2, "day").startOf("day").format() },
  { key: "dia4", value: dayjs().add(3, "day").startOf("day").format() },
  { key: "dia5", value: dayjs().add(4, "day").startOf("day").format() },
  { key: "dia6", value: dayjs().add(5, "day").startOf("day").format() },
  { key: "dia7", value: dayjs().add(6, "day").startOf("day").format() },
  { key: "dia8", value: dayjs().add(7, "day").startOf("day").format() },
  { key: "dia9", value: dayjs().add(8, "day").startOf("day").format() },
  { key: "dia10", value: dayjs().add(9, "day").startOf("day").format() },
  { key: "dia11", value: dayjs().add(10, "day").startOf("day").format() },
  { key: "dia12", value: dayjs().add(11, "day").startOf("day").format() },
];

export function Agendamento() {
  const { id } = useParams();
  const [itemActive, setItemActive] = React.useState("dia1");
  const [dataAtual, setDataAtual] = useState(dayjs().format());
  const [horarios, setHorarios] = useState([]);
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const consultarHorariosAgendamento = async (data: string) => {
    const payload = {
      data,
      experimentoId: id,
    };

    const response = await consultarHorariosDisponiveis(payload);

    if (response.status === 201) {
      setHorarios(response.data);
    }
  };

  useEffect(() => {
    void consultarHorariosAgendamento(dataAtual);
  }, []);

  const cadastrarAgendamento = async () => {
    const hora = Number(horaSelecionada.slice(0, 2));
    const minuto = Number(horaSelecionada.slice(3, 5));

    const payload = {
      dataInicio: dayjs(dataAtual)
        .hour(hora)
        .minute(minuto)
        .millisecond(0)
        .format("YYYY-MM-DDTHH:mm"),
      experimentoId: id,
      alunoId: auth.user?.id,
    } as AgendamentoCadastrarDTO;

    const response = await cadastrarAgendamentoApi(payload);

    console.log(response);

    if (response.status === 201) {
      toast.success("Agendamento realizado com sucesso!");
      void consultarHorariosAgendamento(dayjs().format());
    } else {
      toast.error(response.data.message || "Erro ao agendar experimento!");
    }
  };

  const handleConsultarAgenda = (data: string) => {
    void consultarHorariosAgendamento(dayjs(data).format());
  };

  const handleRetorna = () => {
    const path = "/experimentos/" + id;
    navigate(path);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper sx={{ padding: "50px", minHeight: "400px" }}>
            <AiOutlineArrowLeft
              size={35}
              onClick={handleRetorna}
              cursor="pointer"
              color="#153C7A"
            />
            <Title
              fontSize={38}
              fontWeight={600}
              marginBottom="20px"
              marginTop="20px"
            >
              Agendamento
            </Title>
            <Text fontSize={18} fontWeight={500}>
              Quando gostaria de agendar seu experimento?
            </Text>
            <DataCarrosel>
              {data?.map((item: any) => (
                <Item
                  key={item.key}
                  active={itemActive === item.key}
                  onClick={() => {
                    setItemActive(item.key);
                    handleConsultarAgenda(item.value);
                    setDataAtual(item.value);
                  }}
                >
                  {dayjs(item.value).format("MMM").toUpperCase()} <br />{" "}
                  {dayjs(item.value).format("D")}
                </Item>
              ))}
            </DataCarrosel>
            <Text fontSize={18} fontWeight={500} marginBottom="20px">
              Qual seria o melhor horário dentre os disponíveis?
            </Text>
            <HoraCarrosel>
              {horarios?.map((item: any, index) => (
                <ItemHora
                  key={index}
                  active={horaSelecionada === item}
                  onClick={() => setHoraSelecionada(item)}
                >
                  {item}
                </ItemHora>
              ))}
            </HoraCarrosel>
            <PrimaryButton handleClick={cadastrarAgendamento}>
              AGENDAR
            </PrimaryButton>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
