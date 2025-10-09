import { useMemo, useCallback } from 'react';
import { useTheme } from 'styled-components/native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from "@components/Header";
import { Container, ContainerButton, Main, Title } from "./styles";
import { DashboardButton } from "@components/DashboardButton";
import { BroomIcon, ClockCountdownIcon } from "phosphor-react-native";

import { StackNavigationProp } from '@react-navigation/stack';
import { AppRoutesParamList } from '@routes/app.routes';
import { useRooms } from '@contexts/RoomsContext';
import { SummaryCard } from '@components/SummaryCard';

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<AppRoutesParamList>>();
  const { rooms, refreshRooms } = useRooms();

  useFocusEffect(
    useCallback(() => {
      refreshRooms();
    }, [refreshRooms]),
  );

  const dashboardStats = useMemo(() => {
    if (rooms.length === 0) {
      return { 
        pendentes: 0, 
        progresso: 0, 
        ultimaLimpezaSubtitle: '',
        limpezaEmAndamentoSubtitle: '',
      };
    }

    const totalSalas = rooms.length;

    const pendentes = rooms.filter(s => s.status_limpeza === 'Limpeza Pendente' || s.status_limpeza === 'Limpeza Urgente').length;
    
    const limpas = rooms.filter(s => s.status_limpeza === 'Limpa').length;
    const progresso = Math.round((limpas / totalSalas) * 100);
    
    const ultimaLimpezaObj = rooms
      .filter(s => s.ultima_limpeza_data_hora)
      .sort((a, b) => new Date(b.ultima_limpeza_data_hora!).getTime() - new Date(a.ultima_limpeza_data_hora!).getTime())[0];

    const limpezaEmAndamentoObj = rooms.filter(s => s.status_limpeza === 'Em Limpeza');

    let ultimaLimpezaSubtitle = 'Nenhuma registrada';

    if (ultimaLimpezaObj) {
      try {
        const dataFormatada = format(parseISO(ultimaLimpezaObj.ultima_limpeza_data_hora!), "- dd/MM/yy 'às' HH:mm", { locale: ptBR });
        ultimaLimpezaSubtitle = `${ultimaLimpezaObj.nome_numero} ${dataFormatada}`;
      } catch (e) {
        ultimaLimpezaSubtitle = 'Data inválida';
      }
    }

    let limpezaEmAndamentoSubtitle = 'Nenhuma em andamento';
    // if (limpezaEmAndamentoObj) {
    //   limpezaEmAndamentoSubtitle = `${limpezaEmAndamentoObj.nome_numero} - Iniciada às  `;
    // }

    // if (limpezaEmAndamentoObj) {
    //   try {
    //     const dataFormatada = format(parseISO(limpezaEmAndamentoObj.ultima_limpeza_data_hora!), "'- Iniciada às' HH:mm", { locale: ptBR });
    //     limpezaEmAndamentoSubtitle = `${limpezaEmAndamentoObj.nome_numero} ${dataFormatada}`;
    //   } catch (e) {
    //     limpezaEmAndamentoSubtitle = 'Data inválida';
    //   }
    // }
    
    return {
      pendentes,
      progresso,
      limpas,
      ultimaLimpezaSubtitle,
      limpezaEmAndamentoSubtitle
    };
  }, [rooms]);

  const handleStartCleaning = () => {
    navigation.navigate("ClassRoom"); 
  };
  
  return (
    <Container>
      <Header title="Gerenciamento de Limpeza"/>
      <Main>
        <SummaryCard 
          pendingRoomsCount={dashboardStats.pendentes}
          onStartCleaning={handleStartCleaning}
        />
        <Title>Dashboard</Title>
        <ContainerButton>
          <DashboardButton 
            progress={dashboardStats.progresso}
            title="Total de salas Limpas"
          />
          <DashboardButton 
            title="Última limpeza:" 
            subtitle={dashboardStats.ultimaLimpezaSubtitle} 
            icon={<BroomIcon color={theme.COLORS.ACCENT} size={50} weight="fill"/>}
          />
        </ContainerButton>
      </Main>
    </Container>
  )
}