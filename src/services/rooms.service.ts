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

export interface CreateSalaData {
  nome_numero: string;
  capacidade: number;
  descricao: string;
  localizacao: string;
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

export const createSala = async (data: CreateSalaData): Promise<Sala> => {
  try {
    const response = await api.post('/salas/', data);
    return response.data;
  } catch (error) {
    console.error("Falha ao criar sala:", error);
    throw error;
  }
};

export const updateSala = async (id: number, data: Partial<CreateSalaData>): Promise<Sala> => {
  try {
    const response = await api.patch(`/salas/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Falha ao atualizar a sala ${id}:`, error);
    throw error;
  }
};

export const deleteSala = async (id: number): Promise<void> => {
  try {
    await api.delete(`/salas/${id}/`);
  } catch (error) {
    console.error(`Falha ao deletar a sala ${id}:`, error);
    throw error;
  }
};

export const marcarSalaComoLimpa = async (salaId: number) => {
  try {
    const response = await api.post(`/salas/${salaId}/marcar_como_limpa/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to mark room ${salaId} as clean:`, error);
    throw error;
  }
};