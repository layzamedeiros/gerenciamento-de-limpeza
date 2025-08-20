import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

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
      return { pendentes: 0, progresso: 0, ultimaLimpeza: 'Nenhuma' };
    }

    const totalSalas = salas.length;
    const pendentes = salas.filter(s => s.status_limpeza === 'Limpeza Pendente').length;
    const limpas = totalSalas - pendentes;
    const progresso = Math.round((limpas / totalSalas) * 100);
    
    const ultimaLimpeza = salas
      .filter(s => s.ultima_limpeza_data_hora)
      .sort((a, b) => new Date(b.ultima_limpeza_data_hora!).getTime() - new Date(a.ultima_limpeza_data_hora!).getTime())[0];

    return {
      pendentes,
      progresso,
      ultimaLimpeza: ultimaLimpeza ? ultimaLimpeza.nome_numero : 'Nenhuma',
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

          <DashboardButton 
            title="Última limpeza:"
            subtitle={dashboardStats.ultimaLimpeza}
            icon={<ClockCountdownIcon color={theme.COLORS.WHITE} size={50} weight="fill"/>}
          />

        </ContainerButton>
      </Main>
    </Container>
  )
}