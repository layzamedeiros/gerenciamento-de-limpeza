import React, { useState, useMemo, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Container, Content, FilterContainer } from "./styles";
import { useTheme } from "styled-components/native";
import { PlusCircleIcon } from "phosphor-react-native";

import { Header } from "@components/Header";
import { CardRoom } from "@components/CardRoom";
import FilterButton, { FilterStatus } from "@components/FilterButton";
import { CreateRoomModal } from "@components/CreateRoomModal";
import { EditRoomModal } from "@components/EditRoomModal";
import { ConfirmationModal } from "@components/ConfirmationModal";
import { MessageHighlight } from "@components/ConfirmationModal/styles";
import { SearchBar } from "@components/Search";
import { CircleButton } from "@components/CircleButton";

import { useRooms } from "@contexts/RoomsContext";
import { useAuth } from "@contexts/AuthContext";
import { deleteRoom, Room } from "@services/rooms.service";

import Toast from "react-native-toast-message";
import { AppError } from "src/utils/AppError";

export function ClassRoom() {
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const { rooms, refreshRooms } = useRooms();

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState<Room>({} as Room);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("todas");
  const [searchTerm, setSearchTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      refreshRooms();
    }, []),
  );

  const filteredSalas = useMemo(() => {
    return rooms
      .filter(room => {
        if (activeFilter === "todas") return true;
        if (activeFilter === "limpas") return room.status_limpeza === "Limpa";
        if (activeFilter === "pendentes") {
          return ["Limpeza Pendente", "Limpeza Urgente", "Em Limpeza"].includes(room.status_limpeza);
        }
        return true;
      })
      .filter(room => 
        room.nome_numero.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [rooms, activeFilter, searchTerm]);

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setEditModalVisible(true);
  };

  const handleOpenDeleteModal =(room: Room) => {
    setSelectedRoom(room);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(selectedRoom.qr_code_id);
      refreshRooms();

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text1Style: {
          fontSize: 16,
        },
        text2: "Sala apagada com sucesso!",
        text2Style: {
          fontSize: 12,
        },
      });

      setDeleteModalVisible(false);
    } catch (error) {
      setDeleteModalVisible(false);
      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : "Não foi possível deletar a sala";

      if (errorMessage !== "Token inválido.") {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: errorMessage,
          text1Style: {
            fontSize: 18
          },
          text2Style: {
            fontSize: 16
          }
        });
      }
    } 
  }

  const handleFilterPress = () => {
    console.log("Filtros avançados clicado");
  };

  return (
    <Container>
      <Header title="Salas de Aula" />
      <Content>
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          onFilterPress={handleFilterPress}
          placeholder="Buscar sala"
        />

        <FilterContainer>
          <FilterButton activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </FilterContainer>

        <FlatList
          data={filteredSalas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardRoom
              room={item}
              onEdit={handleEdit}
              onDelete={() => handleOpenDeleteModal(item)}
              onReport={() => {}} 
              isAdmin={isAdmin}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, gap: 8 }}
        />
      </Content>

      <CreateRoomModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onRoomCreated={refreshRooms}
      />

      <EditRoomModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onRoomUpdated={refreshRooms}
        room={selectedRoom}
      />
      
      <ConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete} 
        title="Excluir sala"
      >
        Deseja excluir <MessageHighlight>{selectedRoom?.nome_numero}</MessageHighlight>?
      </ConfirmationModal>

      <CircleButton 
        Icon={PlusCircleIcon} 
        iconSize={48} 
        colorIcon={theme.COLORS.WHITE} 
        onPress={() => setCreateModalVisible(true)}
      />
    </Container>
  );
}