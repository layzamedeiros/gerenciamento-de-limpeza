import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DotsThreeVerticalIcon, PencilSimpleIcon, SealWarningIcon, TrashIcon } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { Room } from '@services/rooms.service';

import {  CardContainer, Title, SubTitle, CardHeader, StatusTag, StatusTagText, ExpandedContent, DetailsContainer, RoomImage, MenuItem, MenuSeparator, MenuItemText, Line, DetailLabel, } from "./styles";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import api from '@services/api';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

type Props = {
  room: Room;
  isAdmin?: boolean;
  isSolicitante?: boolean;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  onReport: (room: Room) => void;
}

export function CardRoom({ room, isSolicitante = false, isAdmin = false, onEdit, onDelete, onReport }: Props) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "Nenhuma limpeza registrada";
    }
    try {
      return format(parseISO(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  };
  
  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} activeOpacity={0.8}>
      <CardContainer style={{ boxShadow: `0px 0.5px 3px ${theme.COLORS.BLACK_SHADOW}` }}>
        <CardHeader>
          <Title>{room.nome_numero}</Title>
          <StatusTag status={room.status_limpeza}>
            <StatusTagText status={room.status_limpeza}>
              {room.status_limpeza === 'Limpeza Pendente' ? 'Limpeza Urgente' : room.status_limpeza}
            </StatusTagText>
          </StatusTag>
          {(isAdmin || isSolicitante) && (
            <Menu>
              <MenuTrigger>
                <DotsThreeVerticalIcon size={24} color={theme.COLORS.TITLE} weight="bold" />
              </MenuTrigger>

              <MenuOptions customStyles={{
                optionsContainer: {
                  backgroundColor: theme.COLORS.SURFACE,
                  borderRadius: 8,
                  marginTop: 30,
                },
              }}>
                {isAdmin && (
                  <>
                    <MenuOption onSelect={() => onEdit(room)}>
                      <MenuItem> 
                        <MenuItemText>Editar</MenuItemText>
                        <PencilSimpleIcon size={20} color={theme.COLORS.TITLE} />
                      </MenuItem>
                    </MenuOption>
                    <MenuSeparator />
                    <MenuOption onSelect={() => onDelete(room)}>
                      <MenuItem>
                        <MenuItemText isDelete>Excluir</MenuItemText>
                        <TrashIcon size={20} color={theme.COLORS.DANGER} />
                      </MenuItem>
                    </MenuOption>
                  </>
                )}

                {(isAdmin || isSolicitante) && (
                  <>
                    {isAdmin && <MenuSeparator />}
                    <MenuOption onSelect={() => onReport(room)}>
                      <MenuItem>
                        <MenuItemText isDelete>Solicitar Limpeza</MenuItemText>
                        <SealWarningIcon size={20} color={theme.COLORS.DANGER}/>
                      </MenuItem>
                    </MenuOption>
                  </>
                )}
              </MenuOptions>
            </Menu>
          )}
        </CardHeader>

        <Line />
        
        <SubTitle style={{ marginTop: 8 }}>
            <DetailLabel>Última limpeza: </DetailLabel>
            {formatDate(room.ultima_limpeza_data_hora)}
        </SubTitle>
        
        {room.ultima_limpeza_funcionario && (
            <SubTitle>
                <DetailLabel>Colaborador: </DetailLabel>
                {room.ultima_limpeza_funcionario}
            </SubTitle>
        )}
        
        {isExpanded && (
          <ExpandedContent>
            {room.imagem && <RoomImage source={{ uri: `${api.defaults.baseURL?.replace('/api/', '')}${room.imagem}` }} />}
            <DetailsContainer>
              {room.responsaveis.length > 0 && 
                <SubTitle><DetailLabel>Responsáveis: </DetailLabel>{room.responsaveis.join(', ')}</SubTitle>
              }
              {room.instrucoes && 
                <SubTitle><DetailLabel>Instruções: </DetailLabel>{room.instrucoes}</SubTitle>
              }
              {room.descricao && 
                <SubTitle><DetailLabel>Descrição: </DetailLabel>{room.descricao}</SubTitle>
              }
              <SubTitle><DetailLabel>Capacidade: </DetailLabel>{room.capacidade} pessoas</SubTitle>
              <SubTitle><DetailLabel>Validade da Limpeza: </DetailLabel>{room.validade_limpeza_horas} horas</SubTitle>
            </DetailsContainer>
          </ExpandedContent>
        )}
      </CardContainer>     
    </TouchableOpacity>
  )
}