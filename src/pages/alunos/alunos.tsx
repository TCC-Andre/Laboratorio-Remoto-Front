import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../../shared/components/Sidebar/sidebar";
import DataTable from "../../shared/components/TablePagination/tablePagination";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { AlunosListarDTO } from "./dtos/AlunosListarDTO";
import { AlunosCadastrarDTO } from "./dtos/AlunosCadastrarDTO";
import { api } from "../../services/api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { AlunosTurmasListarDTO } from "./dtos/AlunosTurmasListarDTO";
import { queryClient } from "../../services/queryClient";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.grey};
  display: inline-flex;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DivButtons = styled.div`
  width: 85%;
  display: inline-flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 0 auto;
  padding-top: 30px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const FormText = styled.h1`
  color: #525252;
  font-size: 18px;
  font-weight: 400;
  text-align: left;
  padding-bottom: 25px;
`;

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  padding: "50px",
};

export function Alunos() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataTable, setDataTable] = useState(Array<Object>);
  const [turmas, setTurmas] = useState(Array<AlunosTurmasListarDTO>);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const listarAlunos = async () => {
    const response = await api.get("alunos/");

    const temp: AlunosListarDTO[] = [];
    response.data.forEach((value: AlunosListarDTO) => {
      temp.push({
        id: value.id,
        nome: value.nome,
        matricula: value.matricula,
        email: value.email,
        dataCadastro: dayjs(value.dataCadastro).format("DD/MM/YYYY"),
      });
    });

    setDataTable(temp);
  };

  const cadastrarAlunos = async (data: any) => {
    const aluno = {
      nome: data.nome,
      matricula: data.matricula,
      email: data.email,
      senha: data.senha,
      turma: data.turma,
    } as AlunosCadastrarDTO;

    await api
      .post("alunos/", aluno)
      .then((response) => {
        console.log(response.status);
        handleClose();
        toast.success("Aluno cadastrado com sucesso!");
        void queryClient.invalidateQueries("listar_alunos");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Erro ao cadastrar aluno!");
      });
  };

  useQuery("listar_alunos", listarAlunos);

  useQuery("listar_turmas", async () => {
    const response = await api.get("turmas/");

    const temp: AlunosTurmasListarDTO[] = [];
    response.data.forEach((value: AlunosTurmasListarDTO) => {
      temp.push({
        id: value.id,
        nome: value.nome,
        codigo: value.codigo,
      });
    });
    setTurmas(temp);
  });

  const columnsTable = [
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "matricula", headerName: "Matricula", width: 150 },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "dataCadastro", headerName: "Data de cadastro", width: 150 },
  ];

  return (
    <Container>
      <Sidebar />
      <Content>
        <DivButtons>
          <PrimaryButton text={"Cadastrar"} handleClick={handleOpen} />
        </DivButtons>
        <DataTable data={dataTable} columns={columnsTable} />
      </Content>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormText>Preencha corretamente os dados cadastrais.</FormText>
          <Form onSubmit={handleSubmit(cadastrarAlunos)}>
            <TextField
              id="outlined-nome"
              label="Nome"
              required={true}
              defaultValue=""
              {...register("nome")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-matricula"
              label="Matricula"
              required={true}
              {...register("matricula")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-email"
              label="E-mail"
              required={true}
              {...register("email")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-senha"
              label="Senha"
              required={true}
              {...register("senha")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Turma</InputLabel>
              <Select
                id="simple-select-label-turma"
                labelId="simple-select-turma"
                label="Turma"
                defaultValue={""}
                required={true}
                {...register("turma")}
                sx={{ width: "100%", background: "#F5F4FF" }}
              >
                {turmas.map((turma, index) => (
                  <MenuItem value={turma.id} key={index}>
                    {turma.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <PrimaryButton text={"Cadastrar"} />
          </Form>
        </Box>
      </Modal>
    </Container>
  );
}