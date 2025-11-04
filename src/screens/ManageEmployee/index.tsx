import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { CardEmployees } from '@components/CardEmployees';
import { useEmployees } from '@contexts/EmployeeContext';
import { CreateEmployeeModal } from '@components/CreateEmployeeModal';

import { Container, Content, FilterContainer } from "./styles";
import { ApiKey, ApiValue, FilterUserButton, UserFilterStatus } from '@components/FilterUserButton';
import { User } from '@services/employee.service';
import { SearchBar } from '@components/Search';
import { useAuth } from '@contexts/AuthContext';
import { CircleButton } from '@components/CircleButton';
import { PlusCircleIcon } from "phosphor-react-native";

export function ManageEmployee() {
  const theme = useTheme();
  const { isAdmin } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    filteredUsers,
    isLoading,
    activeFilter,
    searchTerm,
    setActiveFilter,
    setFilterParams,
    setSearchTerm,
    refreshUsers
  } = useEmployees();

  const handleFilterChange = (
    status: UserFilterStatus,
    keyName: ApiKey,
    keyValue: ApiValue
  ) => {
    setActiveFilter(status);
    setFilterParams(keyName, keyValue);
  }

  const getUserRoleLabel = (user: User) => {
    const ZELADORIA_GROUP_ID = 1;
    if (user.is_superuser) return 'Admin';
    if (user.groups.includes(ZELADORIA_GROUP_ID)) return 'Zeladoria';
    return 'Colaborador';
  };

  useFocusEffect(
    useCallback(() => {
      refreshUsers();
      return () => { };
    }, [refreshUsers])
  );

  return (
    <Container>
      <Header title="Gerenciar Usuários" />
      <Content>
        <SearchBar
          placeholder='Buscar usuário'
          onChangeText={setSearchTerm}
          value={searchTerm}
          onFilterPress={() => console.log('Filtro detalhado pressionado')}
        />

        <FilterContainer>

          <FilterUserButton
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </FilterContainer>

        {isLoading && filteredUsers.length === 0 ? (
          <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardEmployees title={item.name || item.username} subtitle={item.email} roleLabel={getUserRoleLabel(item)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        <CircleButton
          Icon={PlusCircleIcon}
          iconSize={48}
          colorIcon={theme.COLORS.WHITE}
          onPress={() => setIsModalVisible(true)}
        />
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