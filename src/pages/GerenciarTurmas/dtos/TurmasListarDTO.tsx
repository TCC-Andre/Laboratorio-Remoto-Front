export interface TurmasListarDTO {
  id: string;
  nome: string;
  codigo: string;
  professor: string;
  dataCadastro?: string;
}

export interface Professor {
  id: string;
  nome: string;
  matricula: string;
}
