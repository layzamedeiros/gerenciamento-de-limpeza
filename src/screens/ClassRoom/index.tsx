import React, { useState, useMemo } from 'react'; // Adicione useState e useMemo
import { ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Header } from "@components/Header";
import { Container, Content, FilterContainer } from "./styles";
import { CardRoom } from "@components/CardRoom";
import FilterButton, { FilterStatus } from "@components/FilterButton"; 

import { useSalas } from '@contexts/RoomsContext';

export function ClassRoom() {
  const theme = useTheme();
  const { salas, isLoading } = useSalas();

  const [activeFilter, setActiveFilter] = useState<FilterStatus>('todas');

  const filteredSalas = useMemo(() => {
    if (activeFilter === 'limpas') {
      return salas.filter(sala => sala.status_limpeza === 'Limpa');
    }
    if (activeFilter === 'pendentes') {
      return salas.filter(sala => sala.status_limpeza === 'Limpeza Pendente');
    }
    return salas;
  }, [salas, activeFilter]);

  if (isLoading && salas.length === 0) {
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
          <FilterButton
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </FilterContainer>

        <FlatList
          data={filteredSalas} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardRoom
              status={item.status_limpeza === 'Limpa' ? 'limpa' : 'pendente'}
              statustitle={item.status_limpeza}
              title={item.nome_numero}
              capacidade={item.capacidade}
              descricao={item.descricao}
              ultimaLimpeza={item.ultima_limpeza_data_hora} 
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </Content>
    </Container>
  );
}