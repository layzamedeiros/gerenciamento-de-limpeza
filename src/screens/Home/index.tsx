import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from "@components/Header";
import { Container, ContainerButton, Main, Title } from "./styles";
import { DashboardButton } from "@components/DashboardButton";
import { WarningIcon, ChalkboardTeacherIcon, ClockCountdownIcon } from "phosphor-react-native";

import { StackNavigationProp } from '@react-navigation/stack';
import { AppRoutesParamList } from '@routes/app.routes';
import { useSalas } from '@contexts/RoomsContext';

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<AppRoutesParamList>>();
  const { salas, isLoading } = useSalas();
  
  const dashboardStats = useMemo(() => {
    if (salas.length === 0) {
      return { 
        pendentes: 0, 
        progresso: 0, 
        ultimaLimpezaSubtitle: 'Nenhuma registrada' 
      };
    }

    const totalSalas = salas.length;
    const pendentes = salas.filter(s => s.status_limpeza === 'Limpeza Pendente').length;
    const limpas = totalSalas - pendentes;
    const progresso = Math.round((limpas / totalSalas) * 100);
    
    const ultimaLimpezaObj = salas
      .filter(s => s.ultima_limpeza_data_hora)
      .sort((a, b) => new Date(b.ultima_limpeza_data_hora!).getTime() - new Date(a.ultima_limpeza_data_hora!).getTime())[0];

    // --- LÓGICA DE FORMATAÇÃO DO SUBTÍTULO ---
    let ultimaLimpezaSubtitle = 'Nenhuma registrada';

    if (ultimaLimpezaObj) {
      try {
        const dataFormatada = format(parseISO(ultimaLimpezaObj.ultima_limpeza_data_hora!), "dd/MM/yy 'às' HH:mm", { locale: ptBR });
        // Junta o nome da sala com a data formatada
        ultimaLimpezaSubtitle = `${ultimaLimpezaObj.nome_numero}\n${dataFormatada}`;
      } catch (e) {
        ultimaLimpezaSubtitle = 'Data inválida';
      }
    }
    // --- FIM DA LÓGICA ---

    return {
      pendentes,
      progresso,
      ultimaLimpezaSubtitle,
    };
  }, [salas]);

  if (isLoading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </Container>
    );
  }

  return(
    <Container>
      <Header title="Gerenciamento de limpeza"/>
      <Main>
        <Title>Dashboard</Title>
        <ContainerButton>

          <DashboardButton 
            icon={<WarningIcon color={theme.COLORS.WHITE} size={50} weight="fill"/>}
            title={`${dashboardStats.pendentes} Salas com limpeza pendente`}
          />

          <DashboardButton 
            progress={dashboardStats.progresso}
            title="Total de salas limpas"
          />

          <DashboardButton 
            title="Ver salas de aula"
            icon={<ChalkboardTeacherIcon color={theme.COLORS.WHITE} size={50} weight="fill"/>}
            onPress={() => navigation.navigate('ClassRoom')}
          />

          {/* --- CARD ATUALIZADO --- */}
          <DashboardButton 
            title="Última limpeza:" // Título agora é estático
            subtitle={dashboardStats.ultimaLimpezaSubtitle} // Subtítulo agora tem nome e data
            icon={<ClockCountdownIcon color={theme.COLORS.WHITE} size={50} weight="fill"/>}
          />

        </ContainerButton>
      </Main>
    </Container>
  )
}