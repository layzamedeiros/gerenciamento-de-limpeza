import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PlusIcon } from 'phosphor-react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { CardEmployees } from '@components/CardEmployees';
import { useEmployees } from '@contexts/EmployeeContext';
import { CreateEmployeeModal } from '@components/CreateEmployeeModal';

import { Button, ButtonText, Container, Content } from "./styles";

export function ManageEmployee() {
  const theme = useTheme();
  const { users, isLoading, refreshUsers } = useEmployees();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshUsers();
    }, [])
  );

  return (
    <Container>
      <Header title="Gerenciar Usuários" />
      <Content>
        <Button onPress={() => setIsModalVisible(true)}>
          <PlusIcon color="white" size={24} weight='bold' />
          <ButtonText>Cadastrar Funcionário</ButtonText>
        </Button>

        {isLoading && users.length === 0 ? (
          <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardEmployees title={item.name || item.username} subtitle={item.email} isAdmin={item.is_superuser} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </Content>
      
      <CreateEmployeeModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onEmployeeCreated={() => {
          refreshUsers(); 
        }}
      />
    </Container>
  );
}