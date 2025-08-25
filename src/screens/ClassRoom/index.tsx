import React, { useState, useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PlusIcon } from 'phosphor-react-native';

import { Header } from "@components/Header";
import { CardRoom } from "@components/CardRoom";
import FilterButton, { FilterStatus } from "@components/FilterButton"; 
import { CreateRoomModal } from '@components/CreateRoomModal';
import { useSalas } from '@contexts/RoomsContext';
import { useAuth } from '@contexts/AuthContext'; 

import { Button, ButtonText, Container, Content, FilterContainer } from "./styles";

export function ClassRoom() {
  const theme = useTheme();
  
  const { user } = useAuth(); 
  const { salas, isLoading, refreshSalas } = useSalas(); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

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
      <Header title="Salas de aula" />
      <Content>
        {user?.is_staff && (
          <Button onPress={() => setIsModalVisible(true)}>
            <PlusIcon color="white" size={24} weight='bold' />
            <ButtonText>Adicionar nova sala</ButtonText>
          </Button>
        )}
        
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
      
      <CreateRoomModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onRoomCreated={refreshSalas}
      />
    </Container>
  );
}