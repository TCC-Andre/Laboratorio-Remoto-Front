export interface ExperimentoCadastrarDTO {
  nome: string;
  descricao: string;
  duracao: number;
  status: boolean;
  turma: Array<{}>;
}
