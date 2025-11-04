import React from 'react'; // Removemos o useEffect
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CaretLeftIcon, Check, Clock, Warning } from 'phosphor-react-native';

import { Header } from "@components/Header";
import theme from "@theme/index";

import {
  Container,
  Content,
  GoBackButton,
  GoBackButtonText,
  TopBarContainer,
  MarkAllButton,
  MarkAllButtonText,
  LoadingContainer,
  EmptyListText,
  NotificationItemContainer,
  UnreadIndicator,
  IconContainer,
  MainContent,
  TopRow,
  NotificationText,
  NotificationTime,
} from "./styles";

// 1. DEFINIMOS o tipo 'NotificationType' localmente
type NotificationType = {
  id: number;
  lida: boolean;
  message: string;
  time: string;
  type: 'warning' | 'info';
};

// 2. CRIAMOS os dados de exemplo (mock)
const MOCK_NOTIFICATIONS: NotificationType[] = [
  {
    id: 1,
    lida: false, // Não lida
    message: "A sala Laboratório de informática foi reportada com suja.",
    time: "há 5 minutos",
    type: "warning"
  },
  {
    id: 2,
    lida: false, // Não lida
    message: "A limpeza da Sala Teórica 06 expirou.",
    time: "há 2 horas",
    type: "info"
  },
  {
    id: 3,
    lida: true, // Lida
    message: "A limpeza da Sala Teórica 06 expirou.",
    time: "há 2 horas",
    type: "info"
  },
  {
    id: 4,
    lida: true, // Lida
    message: "A sala Laboratório de informática foi reportada com suja.",
    time: "há 5 dias",
    type: "warning"
  },
];

export function Notification() {
  const navigation = useNavigation();
  const notifications = MOCK_NOTIFICATIONS;
  const loading = false; 
  const markAsRead = (id: number) => {
    console.log(`[Mock] Marcar como lida: ${id}`);
  };

  const markAllAsRead = () => {
    console.log("[Mock] Marcar todas como lidas");
  };

  // REMOVEMOS o useEffect

  // Função para renderizar o ícone correto (sem alterações)
  function getNotificationIcon(type: 'warning' | 'info') {
    if (type === 'warning') {
      return <Warning size={24} color={theme.COLORS.ACCENT} />;
    }
    return <Clock size={24} color={theme.COLORS.ACCENT} />;
  }

  // Renderiza cada item da lista (sem alterações)
  function renderNotificationItem({ item }: { item: NotificationType }) {
    return (
      <NotificationItemContainer onPress={() => markAsRead(item.id)}>
        {!item.lida && <UnreadIndicator />}

        <IconContainer>
          {getNotificationIcon(item.type)}
        </IconContainer>

        <MainContent>
          <TopRow>
            <NotificationText>
              {item.message}
            </NotificationText>
            <NotificationTime>
              {item.time}
            </NotificationTime>
          </TopRow>
        </MainContent>
      </NotificationItemContainer>
    );
  }

  // Conteúdo principal da tela (sem alterações)
  function renderContent() {
    if (loading) {
      return (
        <LoadingContainer>
          <ActivityIndicator color={theme.COLORS.PRIMARY} size="large" />
        </LoadingContainer>
      );
    }

    return (
      <FlatList
        data={notifications} // <-- Agora usa os dados de exemplo
        keyExtractor={item => String(item.id)}
        renderItem={renderNotificationItem}
        ListEmptyComponent={
          <EmptyListText>Nenhuma notificação encontrada.</EmptyListText>
        }
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <Container>
      <Header title="Notificações" showNotificationIcon={false} />

      <Content>
        <TopBarContainer>
          <GoBackButton onPress={() => navigation.goBack()}>
            <CaretLeftIcon size={16} color={theme.COLORS.PRIMARY}></CaretLeftIcon>
            <GoBackButtonText>Voltar</GoBackButtonText>
          </GoBackButton>

          <MarkAllButton onPress={markAllAsRead}>
            <Check size={16} color={theme.COLORS.PRIMARY} />
            <MarkAllButtonText>Marcar todas como lidas</MarkAllButtonText>
          </MarkAllButton>
        </TopBarContainer>

        {renderContent()}

      </Content>
    </Container>
  )
}