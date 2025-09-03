import React, { useState, useMemo, useCallback } from "react";
import { ActivityIndicator, FlatList, Alert } from "react-native";
import { useTheme } from "styled-components/native";
import { PlusIcon } from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Container, Content, FilterContainer, Button, ButtonText } from "./styles";
import { CardRoom } from "@components/CardRoom";
import FilterButton, { FilterStatus } from "@components/FilterButton";
import { CreateRoomModal } from "@components/CreateRoomModal";
import { EditRoomModal } from "@components/EditRoomModal";
import { ConfirmationModal } from "@components/ConfirmationModal";
import { MessageHighlight } from "@components/ConfirmationModal/styles";

import { useSalas } from "@contexts/RoomsContext";
import { useAuth } from "@contexts/AuthContext";
import { deleteSala, Sala } from "@services/rooms.service";
import Toast from "react-native-toast-message";

export function ClassRoom() {
  const theme = useTheme();
  const { user } = useAuth();
  const { salas, isLoading, refreshSalas } = useSalas();

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedSala, setSelectedSala] = useState<Sala | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("todas");

  useFocusEffect(
    useCallback(() => {
      refreshSalas();
    }, []),
  );

  const filteredSalas = useMemo(() => {
    if (activeFilter === "limpas")
      return salas.filter((s) => s.status_limpeza === "Limpa");
    if (activeFilter === "pendentes")
      return salas.filter((s) => s.status_limpeza === "Limpeza Pendente");
    return salas;
  }, [salas, activeFilter]);

  const handleEdit = (sala: Sala) => {
    setSelectedSala(sala);
    setEditModalVisible(true);
  };

  const handleDelete = (sala: Sala) => {
    setSelectedSala(sala);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedSala) return;

    setIsDeleting(true);
    try {
      await deleteSala(selectedSala.id);
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text1Style: {
          fontSize: 16,
        },
        text2: "Sala excluída com sucesso!",
        text2Style: {
          fontSize: 14,
        },
      });
      await refreshSalas();
      setDeleteModalVisible(false);
      setSelectedSala(null);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível excluir a sala.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container>
      <Header title="Salas de Aula" />
      <Content>
        {user?.is_staff && (
          <Button onPress={() => setCreateModalVisible(true)}>
            <PlusIcon color="white" size={24} weight="bold" />
            <ButtonText>Cadastrar Nova Sala</ButtonText>
          </Button>
        )}

        <FilterContainer>
          <FilterButton activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </FilterContainer>

        {isLoading && salas.length === 0 ? (
          <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
        ) : (
          <FlatList
            data={filteredSalas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardRoom
                sala={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={user?.is_staff}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </Content>

      <CreateRoomModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onRoomCreated={refreshSalas}
      />

      <EditRoomModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onRoomUpdated={refreshSalas}
        sala={selectedSala}
      />

      <ConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
        title="Excluir sala"
        isLoading={isDeleting}
      >
        Deseja excluir <MessageHighlight>{selectedSala?.nome_numero}</MessageHighlight>?
      </ConfirmationModal>
    </Container>
  );
}
