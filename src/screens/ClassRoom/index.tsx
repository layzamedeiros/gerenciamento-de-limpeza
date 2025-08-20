import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native'; 
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { Header } from "@components/Header";
import { Container, Content, FilterContainer } from "./styles";
import { CardRoom } from "@components/CardRoom";
import FilterButton from "@components/FilterButton";

import { fetchSalas, Sala } from '@services/roomsService';

export function ClassRoom() {
  const theme = useTheme();

  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSalasData() {
      try {
        const data = await fetchSalas();
        setSalas(data);
      } catch (error) {
        console.error("Failed to load classrooms:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSalasData();
  }, []);

  if (isLoading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </Container>
    );
  }

  return (
    <Container>
      <Header 
        title="Salas de aula" 
      />
      <Content>
        <FilterContainer>
          <FilterButton />
        </FilterContainer>

        <FlatList
          data={salas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardRoom
              status={item.status_limpeza === 'Limpa' ? 'limpa' : 'pendente'}
              statustitle={item.status_limpeza}
              title={item.nome_numero}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50}}
        />
      </Content>
    </Container>
  );
}