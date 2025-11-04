import api from './api';

// Interfaces (estão corretas)
export interface DirtyRoomReport {
  data_hora: string;
  reportado_por: string;
  observacoes: string | null;
}

export interface Room {
  id: number;
  qr_code_id: string;
  nome_numero: string;
  imagem: string | null;
  capacidade: number;
  validade_limpeza_horas: number;
  descricao: string | null;
  instrucoes: string | null;
  localizacao: string;
  ativa: boolean;
  responsaveis: string[];
  status_limpeza: 'Limpa' | 'Em Limpeza' | 'Limpeza Pendente' | 'Suja';
  ultima_limpeza_data_hora: string | null;
  ultima_limpeza_funcionario: string | null;
  detalhes_suja: DirtyRoomReport | null;
}

export interface CreateRoomData {
  nome_numero: string;
  capacidade: number;
  localizacao: string;
  validade_limpeza_horas?: number;
  descricao?: string;
  instrucoes?: string;
  responsaveis?: string[];
  imagem?: any;
}

export interface CleaningRecord {
  id: number;
  sala: string;
  sala_nome: string;
  data_hora_inicio: string;
  data_hora_fim: string | null;
  funcionario_responsavel: string;
  observacoes: string | null;
  fotos: { id: number; imagem: string; }[];
}

// Funções da API (estão corretas)

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await api.get('/salas/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    throw error;
  }
};

export const fetchCleaningHistory = async (): Promise<CleaningRecord[]> => {
  try {
    const response = await api.get('/limpezas/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cleaning history:", error);
    throw error;
  }
};

const createFormData = (data: object) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    const value = (data as any)[key];
    if (value !== undefined && value !== null) {
      if (key === 'responsaveis' && Array.isArray(value)) {
        value.forEach(resp => formData.append('responsaveis', resp.toString()));
      } else if (key === 'imagem' && typeof value === 'object' && value.uri) {
        formData.append('imagem', value);
      } else {
        formData.append(key, value);
      }
    }
  });
  return formData;
};

export const createRoom = async (data: CreateRoomData) => {
  const formData = createFormData(data);
  try {
    const response = await api.post('/salas/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create room:", error);
    throw error;
  }
};

export const updateRoom = async (qr_code_id: string, data: Partial<CreateRoomData>) => {
  const formData = createFormData(data);
  try {
    const response = await api.patch(`/salas/${qr_code_id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update room ${qr_code_id}:`, error);
    throw error;
  }
};

export const deleteRoom = async (qr_code_id: string): Promise<void> => {
  try {
    await api.delete(`/salas/${qr_code_id}/`);
  } catch (error) {
    console.error(`Failed to delete room ${qr_code_id}:`, error);
    throw error;
  }
};

export const startCleaning = async (qr_code_id: string) => {
  try {
    const response = await api.post(`/salas/${qr_code_id}/iniciar_limpeza/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to start cleaning for room ${qr_code_id}:`, error);
    throw error;
  }
};

export const addCleaningPhoto = async (cleaningRecordId: number, imageUri: string) => {
  const formData = new FormData();
  const fileName = imageUri.split('/').pop() || 'photo.jpg';
  const fileType = `image/${fileName.split('.').pop()?.toLowerCase() || 'jpeg'}`;

  formData.append('registro_limpeza', cleaningRecordId.toString());
  formData.append('imagem', { uri: imageUri, name: fileName, type: fileType } as any);
  
  try {
    const response = await api.post('/fotos_limpeza/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to add photo to cleaning record ${cleaningRecordId}:`, error);
    throw error;
  }
};

export const deleteCleaningPhoto = async (photoId: number): Promise<void> => {
  try {
    await api.delete(`/fotos_limpeza/${photoId}/`);
  } catch (error) {
    console.error(`Falha ao deletar a foto ${photoId}:`, error);
    throw error;
  }
};

export const finishCleaning = async (qr_code_id: string, observacoes?: string) => {
  try {
    const data = observacoes ? { observacoes } : {};
    const response = await api.post(`/salas/${qr_code_id}/concluir_limpeza/`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to finish cleaning for room ${qr_code_id}:`, error);
    throw error;
  }
};

export const reportDirtyRoom = async (qr_code_id: string, observacoes?: string) => {
  try {
    const data = observacoes ? { observacoes } : {};
    const response = await api.post(`/salas/${qr_code_id}/marcar_como_suja/`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to report dirty room ${qr_code_id}:`, error);
    throw error;
  }
};