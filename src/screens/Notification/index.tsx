import React from 'react'; 
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CaretLeftIcon, Check, Clock, Warning } from 'phosphor-react-native';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from "@components/Header";
import theme from "@theme/index";

import { useNotifications } from '@contexts/NotificationContext';
import { Notification as ApiNotification } from '@services/notification.service';

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

function inferNotificationType(message: string): 'warning' | 'info' {
  const lowerCaseMessage = message.toLowerCase();
  if (lowerCaseMessage.includes('suja') || lowerCaseMessage.includes('reportada')) {
    return 'warning';
  }
  if (lowerCaseMessage.includes('expirou')) {
    return 'info';
  }
  return 'info'; // Padrão
}

function formatRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "agora";
  }
}

export function Notification() {
  const navigation = useNavigation();

  const { 
    notifications, 
    isLoading: loading,
    markAsRead, 
    markAllAsRead 
  } = useNotifications();


  function getNotificationIcon(type: 'warning' | 'info') {
    if (type === 'warning') {
      return <Warning size={24} color={theme.COLORS.ACCENT} />;
    }
    return <Clock size={24} color={theme.COLORS.ACCENT} />;
  }

  function renderNotificationItem({ item }: { item: ApiNotification }) {
    const type = inferNotificationType(item.mensagem);
    const time = formatRelativeTime(item.data_criacao);

    return (
      <NotificationItemContainer onPress={() => !item.lida && markAsRead(item.id)}>
        {!item.lida && <UnreadIndicator />}

        <IconContainer>
          {getNotificationIcon(type)}
        </IconContainer>

        <MainContent>
          <TopRow>
            <NotificationText>
              {item.mensagem}
            </NotificationText>
            <NotificationTime>
              {time}
            </NotificationTime>
          </TopRow>
        </MainContent>
      </NotificationItemContainer>
    );
  }


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
        data={notifications}
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