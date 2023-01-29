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
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { ExperimentosListarDTO } from "./dtos/ExperimentosListarDTO";
import { ExperimentoCadastrarDTO } from "./dtos/ExperimentoCadastrarDTO";
import { api } from "../../services/api/api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { queryClient } from "../../services/queryClient";
import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Title from "../../shared/components/Title/Title";
import { AlunosTurmasListarDTO } from "../GerenciarAlunos/dtos/AlunosTurmasListarDTO";
import {
  cadastrarExperimentoApi,
  deletarExperimentoApi,
  editarExperimentoApi,
} from "../../services/api/experimentos";

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

export function GerenciarExperimentos() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataTable, setDataTable] = useState(Array<Object>);
  const [turmas, setTurmas] = useState(Array<AlunosTurmasListarDTO>);
  const [openEdit, setOpenEdit] = useState(false);
  const [experimentoData, setExperimentoData] = useState(
    {} as ExperimentosListarDTO
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const listarExperimentos = async () => {
    const response = await api.get("experimentos/");

    const temp: ExperimentosListarDTO[] = [];
    response.data.forEach((value: ExperimentosListarDTO) =>
      temp.push({
        id: value.id,
        nome: value.nome,
        descricao: value.descricao,
        duracao: value.duracao,
        status: value.status,
        dataCadastro: dayjs(value.dataCadastro).format("DD/MM/YYYY"),
        imagem: value.imagem,
      })
    );

    setDataTable(temp);
  };

  const cadastrarExperimento = async (data: any) => {
    const experimento = {
      nome: data.nome,
      descricao: data.descricao,
      duracao: Number(data.duracao),
      status: data.status,
      turma: data.turmas,
    } as ExperimentoCadastrarDTO;

    if (experimento.turma) {
      const turmas = experimento.turma.map((value: any) => {
        return { id: value };
      });
      experimento.turma = turmas;
    }

    const formData = new FormData();
    formData.append("file", data.imagem[0]);
    formData.append("nome", experimento.nome);
    formData.append("descricao", experimento.descricao);
    formData.append("duracao", experimento.duracao.toString());
    formData.append("status", experimento.status.toString());
    formData.append("turma", JSON.stringify(experimento.turma));

    const response = await cadastrarExperimentoApi(experimento, formData);

    if (response.status === 201) {
      reset();
      console.log(response.status);
      handleClose();
      toast.success("Experimento cadastrado com sucesso!");
      queryClient.invalidateQueries("listar_experimentos");
    } else {
      toast.error(response.data.message || "Erro ao cadastrar experimento!");
    }
  };

  useQuery("listar_experimentos", listarExperimentos);

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

  const carregarExperimento = async (id: any) => {
    const response = dataTable.find((element: any) => {
      if (element.id === id) {
        return element;
      }
    });
    const experimento = response as ExperimentosListarDTO;
    setExperimentoData(experimento);
    setValue("nomeEdit", experimento.nome);
    setValue("descricaoEdit", experimento.descricao);
    setValue("duracaoEdit", experimento.duracao);
    setValue("statusEdit", experimento.status);
    setOpenEdit(true);
  };

  const editarExperimento = async (data: any) => {
    const experimentoEditado = {
      nome: data.nomeEdit,
      descricao: data.descricaoEdit,
      duracao: Number(data.duracaoEdit),
      status: data.statusEdit,
    };

    const response = await editarExperimentoApi(
      experimentoData.id,
      experimentoEditado
    );

    if (response.status === 200) {
      setOpenEdit(false);
      toast.success("Experimento editado com sucesso!");
      queryClient.invalidateQueries("listar_experimentos");
    } else {
      toast.error(response.data.message || "Erro ao editar experimento!");
    }
  };

  const deletarExperimento = async (id: any) => {
    const response = await deletarExperimentoApi(id);

    if (response.status === 200) {
      console.log(response);
      toast.success("Turma excluída com sucesso!");
      queryClient.invalidateQueries("listar_experimentos");
    } else {
      toast.error(response.data.message || "Erro ao excluir turma!");
    }
  };

  const columnsTable = [
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "descricao", headerName: "Descrição", width: 250 },
    { field: "duracao", headerName: "Duração (min)", width: 120 },
    { field: "status", headerName: "Status", width: 100, type: "boolean" },
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
            deletarExperimento(params.id);
          }}
        />,
        <GridActionsCellItem
          icon={<AiFillEdit size={20} />}
          label="Editar"
          onClick={async () => {
            carregarExperimento(params.id);
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
            Experimentos
          </Title>
          <PrimaryButton handleClick={handleOpen}>CADASTRAR</PrimaryButton>
        </DivButtons>
        <DataTable data={dataTable} columns={columnsTable} />
      </Content>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormText>Preencha corretamente os dados cadastrais.</FormText>
          <Form onSubmit={handleSubmit(cadastrarExperimento)}>
            <TextField
              id="outlined-nome"
              label="Nome"
              required={true}
              defaultValue=""
              {...register("nome")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-descricao"
              label="Descrição"
              required={true}
              {...register("descricao")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-duracao"
              label="Duração"
              type={"number"}
              required={true}
              {...register("duracao")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-imagem"
              type={"file"}
              {...register("imagem")}
              sx={{ width: "100%", background: "#F5F4FF" }}
              InputLabelProps={{ shrink: false }}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                id="simple-select-label-status"
                labelId="simple-select-status"
                label="Status"
                defaultValue={""}
                required={true}
                {...register("status")}
                sx={{ width: "100%", background: "#F5F4FF" }}
              >
                <MenuItem value={true as any}>Ativo</MenuItem>
                <MenuItem value={false as any}>Desativado</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <FormLabel component="legend" sx={{ paddingBottom: "10px" }}>
                Selecione as turmas
              </FormLabel>
              <FormGroup>
                {turmas.map((turma, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox value={turma.id} {...register("turmas")} />
                    }
                    label={turma.nome}
                    key={index}
                  />
                ))}
              </FormGroup>
            </Box>
            <PrimaryButton>CADASTRAR</PrimaryButton>
          </Form>
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={style}>
          <FormText>Altere os dados cadastrais.</FormText>
          <Form onSubmit={handleSubmit(editarExperimento)}>
            <TextField
              id="outlined-nome"
              label="Nome"
              required={true}
              {...register("nomeEdit")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-descricao"
              label="Descrição"
              required={true}
              {...register("descricaoEdit")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <TextField
              id="outlined-duracao"
              label="Duração"
              required={true}
              {...register("duracaoEdit")}
              sx={{ width: "100%", background: "#F5F4FF" }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                id="simple-select-label-status"
                labelId="simple-select-status"
                label="Status"
                required={true}
                {...register("statusEdit")}
                sx={{ width: "100%", background: "#F5F4FF" }}
              >
                <MenuItem value={true as any}>Ativo</MenuItem>
                <MenuItem value={false as any}>Desativado</MenuItem>
              </Select>
            </FormControl>
            <PrimaryButton>Editar</PrimaryButton>
          </Form>
        </Box>
      </Modal>
    </Container>
  );
}
