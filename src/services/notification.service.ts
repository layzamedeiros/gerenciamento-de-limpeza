import api from './api';

export interface Notification {
  id: number;
  mensagem: string;
  link: string | null;
  data_criacao: string;
  lida: boolean;
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await api.get('/notificacoes/');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar notificações:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (id: number): Promise<void> => {
  try {
    await api.post(`/notificacoes/${id}/marcar_como_lida/`);
  } catch (error) {
    console.error(`Falha ao marcar notificação ${id} como lida:`, error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    await api.post('/notificacoes/marcar_todas_como_lidas/');
  } catch (error) {
    console.error("Falha ao marcar todas as notificações como lidas:", error);
    throw error;
  }
};