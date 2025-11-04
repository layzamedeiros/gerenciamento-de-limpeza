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

import { ReportModal } from "@components/ReportModal"; 

import { useRooms } from "@contexts/RoomsContext";
import { useAuth } from "@contexts/AuthContext";

import { deleteRoom, reportDirtyRoom, Room } from "@services/rooms.service"; 

import Toast from "react-native-toast-message";
import { AppError } from "src/utils/AppError";

export function ClassRoom() {
  const { isAdmin, isMemberOfSolicitante } = useAuth(); 
  const theme = useTheme();
  const { rooms, refreshRooms } = useRooms();

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

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
        if (!isAdmin && !room.ativa) {
          return false;
        }
        if (activeFilter === "limpas") {
          return room.ativa && room.status_limpeza === "Limpa";
        }

        if (activeFilter === "pendentes") {
          const isPendente = ["Limpeza Pendente", "Suja"].includes(room.status_limpeza);
          return room.ativa && isPendente;
        }

        if (activeFilter === "todas") {
          return true;
        }

        return true; 
      })
      .filter(room => 
        room.nome_numero.toLowerCase().includes(searchTerm.toLowerCase())
      );

  }, [rooms, activeFilter, searchTerm, isAdmin]);

  const handleEdit = (room: Room) => {
    if (isAdmin) {
      setSelectedRoom(room);
      setEditModalVisible(true);
    }
  };

  const handleOpenDeleteModal =(room: Room) => {
    if (isAdmin) {
      setSelectedRoom(room);
      setDeleteModalVisible(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedRoom) return; 

    try {
      await deleteRoom(selectedRoom.qr_code_id);
      refreshRooms();

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text1Style: { fontSize: 16 },
        text2: "Sala apagada com sucesso!",
        text2Style: { fontSize: 12 },
      });

      setDeleteModalVisible(false);
      setSelectedRoom(null); 
    } catch (error) {
      setDeleteModalVisible(false);
      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : "Não foi possível deletar a sala";

      if (errorMessage !== "Token inválido.") {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: errorMessage,
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 16 }
        });
      }
    } 
  }


  const handleCloseReportModal = () => {
    setReportModalVisible(false);
    setIsReporting(false);
    setSelectedRoom(null);
  };

  const handleOpenReportModal = (room: Room) => {
    setSelectedRoom(room);
    setReportModalVisible(true);
  };

  const handleConfirmReportRoom = async (observacao: string) => { 
    if (!selectedRoom) return;

    if (selectedRoom.status_limpeza === 'Suja' || selectedRoom.status_limpeza === 'Em Limpeza') {
      Toast.show({ type: 'info', text1: 'Ação não necessária', text2: 'Esta sala já está suja ou em limpeza.' });
      handleCloseReportModal();
      return;
    }

    setIsReporting(true);
    try {
      await reportDirtyRoom(selectedRoom.qr_code_id, observacao); 
      Toast.show({ type: 'success', text1: 'Sucesso!', text2: `Sala "${selectedRoom.nome_numero}" reportada como suja.` });
      await refreshRooms(); 
    } catch (error) {
      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : "Não foi possível reportar a sala";

      if (errorMessage !== "Token inválido.") {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: errorMessage,
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 16 }
        });
      }
    } finally {
      handleCloseReportModal(); 
    }
  };


  const handleFilterPress = () => {
    console.log("Filtros avançados clicado");
    console.log(isAdmin);
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
              onDelete={handleOpenDeleteModal}
              onReport={handleOpenReportModal} 
              isAdmin={isAdmin}
              isSolicitante={isMemberOfSolicitante} 
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, gap: 8 }}
        />
      </Content>
    
        { isAdmin &&
          (
            <CreateRoomModal
              visible={isCreateModalVisible}
              onClose={() => setCreateModalVisible(false)}
              onRoomCreated={refreshRooms}
            />
          )
        }
          
        {  isAdmin && selectedRoom && (
          <EditRoomModal
            visible={isEditModalVisible}
            onClose={() => { 
              setEditModalVisible(false);
              setSelectedRoom(null); 
            }}
            onRoomUpdated={refreshRooms}
            room={selectedRoom} 
          />
        )}

        {isAdmin &&
          (        
            <ConfirmationModal
              visible={isDeleteModalVisible}
              onClose={() => setDeleteModalVisible(false)}
              onConfirm={handleDelete} 
              title="Excluir sala"
            >
              Deseja excluir <MessageHighlight>{selectedRoom?.nome_numero}</MessageHighlight>?
            </ConfirmationModal>
          )}

        <ReportModal
          visible={isReportModalVisible}
          onClose={handleCloseReportModal}
          onConfirm={handleConfirmReportRoom}
          sala={selectedRoom} 
          isLoading={isReporting}
        />
        {isAdmin&&
          (
            <CircleButton 
              Icon={PlusCircleIcon} 
              iconSize={48} 
              colorIcon={theme.COLORS.WHITE} 
              onPress={() => setCreateModalVisible(true)}
            />
          )}

    </Container>
  );
}