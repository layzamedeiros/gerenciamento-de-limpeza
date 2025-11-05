import api from "./api";
import { CreateRoomFormData } from "@components/CreateRoomModal";
import { EditRoomFormData } from "@components/EditRoomModal";

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
  status_limpeza: "Limpa" | "Em Limpeza" | "Limpeza Pendente" | "Suja";
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
    const response = await api.get("/salas/");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch rooms:", error);
    throw error;
  }
};

export const fetchCleaningHistory = async (): Promise<CleaningRecord[]> => {
  try {
    const response = await api.get("/limpezas/");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch cleaning history:", error);
    throw error;
  }
};


export const createRoom = async (data: CreateRoomFormData, photoUri: string | null) => {
  const formData = new FormData();

  formData.append("nome_numero", data.nome_numero);
  formData.append("localizacao", data.localizacao);
  formData.append("capacidade", data.capacidade);
  
  if (data.validade_limpeza_horas) {
    formData.append("validade_horas", data.validade_limpeza_horas);
  }
  if (data.descricao) {
    formData.append("descricao", data.descricao);
  }
  if (data.instrucoes) {
    formData.append("instrucoes", data.instrucoes);
  }

  if (data.responsaveis && data.responsaveis.length > 0) {
    data.responsaveis.forEach(responsavel => {
      formData.append("responsaveis", responsavel);
    });
  } else {
    formData.append("responsaveis", "");
  }

  if (photoUri) {
    const filename = photoUri.split('/').pop() || 'foto_sala.jpg';
    console.log(filename)

    formData.append('imagem', { 
      uri: photoUri,
      name: filename,
      type: 'image/jpeg' 
    } as any);
  }

  try {
    const response = await api.post("/salas/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to create room:", error);
    throw error;
  }
}


// ALTERACAO DE LAYZA

// const createFormData = (data: object) => {
//   const formData = new FormData();
//   Object.keys(data).forEach(key => {
//     const value = (data as any)[key];
//     if (value !== undefined && value !== null) {
//       if (key === 'responsaveis' && Array.isArray(value)) {
//         value.forEach(resp => formData.append('responsaveis', resp.toString()));
//       } else if (key === 'imagem' && typeof value === 'object' && value.uri) {
//         formData.append('imagem', value);
//       } else {
//         formData.append(key, value);
//       }
//     }
//   });
//   return formData;
// };


// export const createRoom = async (data: CreateRoomData) => {
//   const formData = createFormData(data);
//   try {
//     const response = await api.post("/salas/", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.log("Failed to create room:", error);
//     throw error;
//   }
// };


export const updateRoom = async (qr_code_id: string, data: EditRoomFormData, deleteExistingPhoto: boolean, photoUri?: string | null) => {
  const formData = new FormData();

  formData.append("nome_numero", data.nome_numero);
  formData.append("localizacao", data.localizacao);
  formData.append("capacidade", data.capacidade);
  
  if (data.validade_limpeza_horas) {
    formData.append("validade_horas", data.validade_limpeza_horas);
  }
  if (data.descricao) {
    formData.append("descricao", data.descricao);
  }
  if (data.instrucoes) {
    formData.append("instrucoes", data.instrucoes);
  }

  if (data.responsaveis && data.responsaveis.length > 0) {
    data.responsaveis.forEach(responsavel => {
      formData.append("responsaveis", responsavel);
    });
  } else {
    formData.append("responsaveis", "");
  }

if (photoUri) {
    // 1. Se tem foto NOVA, anexe-a.
    // O backend (Django/DRF) geralmente substitui a imagem antiga automaticamente.
    const filename = photoUri.split('/').pop() || 'foto_sala.jpg';
    formData.append('imagem', { 
      uri: photoUri,
      name: filename,
      type: 'image/jpeg' 
    } as any);

  } else if (deleteExistingPhoto) {
    // 2. Se NÃO tem foto nova, MAS o usuário removeu a antiga
    // (Enviamos 'null' explicitamente para o campo 'imagem' para limpá-lo)
    formData.append('imagem', null as any);
  }

  try {
    const response = await api.patch(`/salas/${qr_code_id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to create room:", error);
    throw error;
  }
}
// ALTERACAO DE LAYZA

// export const updateRoom = async (qr_code_id: string, data: Partial<CreateRoomData>) => {
//   const formData = createFormData(data);

//   try {
//     const response = await api.patch(`/salas/${qr_code_id}/`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.log("Failed to create room:", error);
//     throw error;
//   }
// };

export const deleteRoom = async (qr_code_id: string): Promise<void> => {
  try {
    await api.delete(`/salas/${qr_code_id}/`);
  } catch (error: any) {
    console.log(`Failed to delete room ${qr_code_id}:`, error.message);
    throw error;
  }
};

export const startCleaning = async (qr_code_id: string) => {
  try {
    const response = await api.post(`/salas/${qr_code_id}/iniciar_limpeza/`);
    return response.data;
  } catch (error) {
    console.log(`Failed to start cleaning for room ${qr_code_id}:`, error);
    throw error;
  }
};

export const addCleaningPhoto = async (cleaningRecordId: number, imageUri: string) => {
  const formData = new FormData();
  const fileName = imageUri.split('/').pop() || 'photo.jpg';
  const fileType = `image/${fileName.split('.').pop()?.toLowerCase() || 'jpeg'}`;

  formData.append("registro_limpeza", cleaningRecordId.toString());
  formData.append("imagem", { uri: imageUri, name: fileName, type: fileType } as any);
  
  try {
    const response = await api.post("/fotos_limpeza/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(`Failed to add photo to cleaning record ${cleaningRecordId}:`, error);
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
    console.log(`Failed to finish cleaning for room ${qr_code_id}:`, error);
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
}
