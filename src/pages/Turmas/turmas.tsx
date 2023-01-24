/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { Professor, TurmasListarDTO } from "./dtos/TurmasListarDTO";
import { TurmasCadastrarDTO } from "./dtos/TurmasCadastrarDTO";
import { api } from "../../services/api/api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { TurmasListarProfessoresDTO } from "./dtos/TurmasListarProfessoresDTO";
import { queryClient } from "../../services/queryClient";
import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Title from "../../shared/components/Title/Title";
import {
  cadastrarTurmaApi,
  deletarTurmaApi,
  editarTurmaApi,
} from "../../services/api/turmas";

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
  justify-content: space-between;
  align-items: center;
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
  height: "85%",
  overflow: "hidden",
  overflowY: "scroll",
};

export function Turmas() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataTable, setDataTable] = useState(Array<Object>);
  const [professores, setProfessores] = useState(
    Array<TurmasListarProfessoresDTO>
  );
  const [openEdit, setOpenEdit] = useState(false);
  const [turmaData, setTurmaData] = useState({} as TurmasListarDTO);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const listarTurmas = async () => {
    const response = await api.get("turmas/");

    const temp: TurmasListarDTO[] = [];
    response.data.forEach((value: TurmasListarDTO) => {
      const prof = value.professor as unknown as Professor;
      temp.push({
        id: value.id,
        nome: value.nome,
        codigo: value.codigo,
        professor: prof.nome,
        dataCadastro: dayjs(value.dataCadastro).format("DD/MM/YYYY"),
      });
    });

    setDataTable(temp);
  };

  const cadastrarTurma = async (data: any) => {
    const turma = {
      nome: data.nome,
      codigo: data.codigo,
      professorId: data.professor,
    } as TurmasCadastrarDTO;

    const response = await cadastrarTurmaApi(turma);

    if (response.status === 201) {
      reset();
      console.log(response.status);
      handleClose();
      toast.success("Turma cadastrada com sucesso!");
      queryClient.invalidateQueries("listar_turmas");
    } else {
      toast.error(response.data.message || "Erro ao cadastrar turma!");
    }
  };

  useQuery("listar_turmas", listarTurmas);

  useQuery("listar_professores", async () => {
    const response = await api.get("professores/");

    const temp: TurmasListarProfessoresDTO[] = [];
    response.data.forEach((value: TurmasListarProfessoresDTO) => {
      temp.push({
        id: value.id,
        nome: value.nome,
        matricula: value.matricula,
      });
    });
    setProfessores(temp);
  });

  const carregarTurma = async (id: any) => {
    const response = dataTable.find((element: any) => {
      if (element.id === id) {
        return element;
      }
    });
    const aluno = response as TurmasListarDTO;
    setTurmaData(aluno);
    setValue("nomeEdit", aluno.nome);
    setValue("codigoEdit", aluno.codigo);
    setOpenEdit(true);
  };

  const editarTurma = async (data: any) => {
    const turmaEditada = {
      nome: data.nomeEdit,
      codigo: data.codigoEdit,
    };

    const response = await editarTurmaApi(turmaData.id, turmaEditada);

    if (response.status === 200) {
      setOpenEdit(false);
      toast.success("Turma editada com sucesso!");
      queryClient.invalidateQueries("listar_turmas");
    } else {
      toast.error(response.data.message || "Erro ao editar turma!");
    }
  };

  const deletarTurma = async (id: any) => {
    const response = await deletarTurmaApi(id);

    if (response.status === 200) {
      console.log(response);
      toast.success("Turma excluída com sucesso!");
      queryClient.invalidateQueries("listar_turmas");
    } else {
      toast.error(response.data.message || "Erro ao excluir turma!");
    }
  };

  const columnsTable = [
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "professor", headerName: "Professor", width: 250 },
    { field: "dataCadastro", headerName: "Data de cadastro", width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params: { id: GridRowId }) => [
        <GridActionsCellItem
          icon={<BsFillTrashFill size={18} />}
          label="Deletar"
          onClick={() => {
            deletarTurma(params.id);
          }}
        />,
        <GridActionsCellItem
          icon={<AiFillEdit size={20} />}
          label="Editar"
          onClick={async () => {
            carregarTurma(params.id);
            setOpenEdit(true);
          }}
        />,
      ],
    },
  ];

  return (
    <Container>
      <Sidebar />
      <Content>
        <DivButtons>
          <Title fontSize={32} fontWeight={600}>
            Turmas
          </Title>
          <PrimaryButton text={"Cadastrar"} handleClick={handleOpen} />
        </DivButtons>
        <DataTable data={dataTable} columns={columnsTable} />
      </Content>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormText>Preencha corretamente os dados cadastrais.</FormText>
          <Form onSubmit={handleSubmit(cadastrarTurma)}>
            <TextField
              id="outlined-nome"
              label="Nome"
              required={true}
              defaultValue=""
              {...register("nome")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-codigo"
              label="Código da turma"
              required={true}
              {...register("codigo")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Professor</InputLabel>
              <Select
                id="simple-select-label-turma"
                labelId="simple-select-turma"
                label="Professor"
                defaultValue={""}
                required={true}
                {...register("professor")}
                sx={{ width: "100%", background: "#F5F4FF" }}
              >
                {professores.map((prof, index) => (
                  <MenuItem value={prof.id} key={index}>
                    {prof.nome} - {prof.matricula}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <PrimaryButton text={"Cadastrar"} />
          </Form>
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={style}>
          <FormText>Altere os dados cadastrais.</FormText>
          <Form onSubmit={handleSubmit(editarTurma)}>
            <TextField
              id="outlined-nome"
              label="Nome"
              required={true}
              {...register("nomeEdit")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-codigo"
              label="Código"
              required={true}
              {...register("codigoEdit")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <PrimaryButton text={"Editar"} />
          </Form>
        </Box>
      </Modal>
    </Container>
  );
}
