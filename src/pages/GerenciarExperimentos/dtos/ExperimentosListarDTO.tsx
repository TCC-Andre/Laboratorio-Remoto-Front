export interface ExperimentosListarDTO {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  status: string;
  dataCadastro?: string;
  imagem: Imagem;
  iframe: string;
}

interface Imagem {
  data: ArrayBufferLike;
  type: string;
}
