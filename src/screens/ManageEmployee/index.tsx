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
  const { funcionarios, isLoading, refreshFuncionarios } = useEmployees();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshFuncionarios();
    }, [])
  );

  return (
    <Container>
      <Header title="Gerenciar Funcionários" />
      <Content>
        <Button onPress={() => setIsModalVisible(true)}>
          <PlusIcon color="white" size={24} weight='bold' />
          <ButtonText>Cadastrar novo Funcionário</ButtonText>
        </Button>

        {isLoading && funcionarios.length === 0 ? (
          <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={funcionarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardEmployees title={item.username} subtitle={item.email} isAdmin={item.is_staff} />
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
          refreshFuncionarios(); 
        }}
      />
    </Container>
  );
}