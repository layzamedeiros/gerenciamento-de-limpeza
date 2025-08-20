import api from './api';

export interface Sala {
  id: number;
  nome_numero: string;
  capacidade: number;
  descricao: string;
  localizacao: string;
  status_limpeza: 'Limpa' | 'Limpeza Pendente';
  ultima_limpeza_data_hora: string | null;
  ultima_limpeza_funcionario: string | null;
}

export const fetchSalas = async (): Promise<Sala[]> => {
  try {
    const response = await api.get('/salas/');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar salas:", error);
    throw error;
  }
};