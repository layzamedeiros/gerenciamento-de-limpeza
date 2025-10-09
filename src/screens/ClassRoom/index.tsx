import React, { useState, useMemo, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Container, Content, FilterContainer } from "./styles";
import { CardRoom } from "@components/CardRoom";
import FilterButton, { FilterStatus } from "@components/FilterButton";
import { CreateRoomModal } from "@components/CreateRoomModal";
import { EditRoomModal } from "@components/EditRoomModal";
import { ConfirmationModal } from "@components/ConfirmationModal";
import { MessageHighlight } from "@components/ConfirmationModal/styles";
import { SearchBar } from "@components/Search";

import { useRooms } from "@contexts/RoomsContext";
import { useAuth } from "@contexts/AuthContext";
import { Room } from "@services/rooms.service";

export function ClassRoom() {
  const { isAdmin } = useAuth();
  const { rooms, refreshRooms } = useRooms();

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
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

  const handleDelete = (room: Room) => {
    setSelectedRoom(room);
    setDeleteModalVisible(true);
  };

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
              onDelete={handleDelete}
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
        sala={selectedRoom}
      />
      
      <ConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={() => console.log("Confirmar exclusão")} 
        title="Excluir sala"
      >
        Deseja excluir <MessageHighlight>{selectedRoom?.nome_numero}</MessageHighlight>?
      </ConfirmationModal>
    </Container>
  );
}