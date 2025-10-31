import api from './api';
import { CreateRoomFormData } from '@components/CreateRoomModal';

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
  responsaveis?: number[];
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

export const createRoom = async (data: CreateRoomFormData) => {
  const formData = new FormData();

  formData.append('nome_numero', data.nome_numero);
  formData.append('localizacao', data.localizacao);
  formData.append('capacidade', data.capacidade);
  
  if (data.validade_horas) {
    formData.append('validade_horas', data.validade_horas);
  }
  if (data.descricao) {
    formData.append('descricao', data.descricao);
  }
  if (data.instrucoes) {
    formData.append('instrucoes', data.instrucoes);
  }

  if (data.responsaveis && data.responsaveis.length > 0) {
    data.responsaveis.forEach(responsavel => {
      formData.append('responsaveis', responsavel);
    });
  }

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
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    const value = (data as any)[key];
    if (value !== undefined) {
      if (key === 'responsaveis' && Array.isArray(value)) {
        value.forEach(respId => formData.append('responsaveis', respId.toString()));
      } else {
        formData.append(key, value);
      }
    }
  });

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
  const fileType = `image/${fileName.split('.').pop()?.toLowerCase()}`;

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

export const finishCleaning = async (qr_code_id: string, observacoes?: string) => {
  try {
    const response = await api.post(`/salas/${qr_code_id}/concluir_limpeza/`, { observacoes });
    return response.data;
  } catch (error) {
    console.error(`Failed to finish cleaning for room ${qr_code_id}:`, error);
    throw error;
  }
};

export const reportDirtyRoom = async (qr_code_id: string, observacoes?: string) => {
    try {
        const response = await api.post(`/salas/${qr_code_id}/marcar_como_suja/`, { observacoes });
        return response.data;
    } catch (error) {
        console.error(`Failed to report dirty room ${qr_code_id}:`, error);
        throw error;
    }
};
