import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { 
  Notification, 
  fetchNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from '@services/notification.service';
import { useAuth } from '@contexts/AuthContext';

interface NotificationContextData {
  notifications: Notification[];
  isLoading: boolean;
  unreadCount: number;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAppLoading } = useAuth(); 

  const unreadCount = notifications.filter(n => !n.lida).length;

  const refreshNotifications = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchNotifications();
      const sortedData = data.sort((a, b) => new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime());
      setNotifications(sortedData);
    } catch (error) {
      console.error("Falha ao atualizar notificações no contexto:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]); 

  useEffect(() => {
    if (!isAppLoading && token) {
      refreshNotifications();
    }
  }, [isAppLoading, token, refreshNotifications]);

  const markAsRead = async (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, lida: true } : n)
    );
    try {
      await markNotificationAsRead(id);
      await refreshNotifications(); 
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao marcar notificação.' });
      await refreshNotifications(); 
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, lida: true })));
    try {
      await markAllNotificationsAsRead();
      await refreshNotifications(); 
      Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Todas as notificações foram marcadas como lidas.' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Falha ao marcar todas como lidas.' });
      await refreshNotifications();
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, isLoading, unreadCount, refreshNotifications, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export { NotificationProvider, useNotifications };