import { Alert } from "react-native";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PencilSimpleIcon, TrashIcon } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { Sala } from '@services/rooms.service';

import { 
  CardContainer, Title, SubTitle, CardHeader, StatusTag, StatusTagText, 
  ActionsContainer, ActionButton, ActionButtonText, DeleteButtonText 
} from "./styles";

type Props = {
  sala: Sala;
  isAdmin?: boolean;
  onEdit: (sala: Sala) => void;
  onDelete: (sala: Sala) => void;
}

export function CardRoom({ sala, isAdmin = false, onEdit, onDelete }: Props) {
  const theme = useTheme();

  const formatarData = (data: string | null) => {
    if (!data) return "Limpeza não realizada";
    try {
      return format(parseISO(data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  };
  
  return (
    <CardContainer>
      <CardHeader>
        <Title>{sala.nome_numero}</Title>
        <StatusTag status={sala.status_limpeza === 'Limpa' ? 'limpa' : 'pendente'}> 
          <StatusTagText status={sala.status_limpeza === 'Limpa' ? 'limpa' : 'pendente'}>
            {sala.status_limpeza === 'Limpa' ? 'Limpa' : 'Pendente'}
          </StatusTagText>
        </StatusTag>
      </CardHeader>
      
      <SubTitle>Capacidade: {sala.capacidade}</SubTitle>
      {!!sala.descricao && <SubTitle>Descrição: {sala.descricao}</SubTitle>}
      <SubTitle>Última limpeza: {formatarData(sala.ultima_limpeza_data_hora)}</SubTitle>

      {isAdmin && (
        <ActionsContainer>
          <ActionButton onPress={() => onEdit(sala)}>
            <PencilSimpleIcon size={20} color={theme.COLORS.SUBTITLE} />
            <ActionButtonText>Editar</ActionButtonText>
          </ActionButton>
          <ActionButton onPress={() => onDelete(sala)}>
            <TrashIcon size={20} color={theme.COLORS.SUBTITLE} />
            <DeleteButtonText>Excluir</DeleteButtonText>
          </ActionButton>
        </ActionsContainer>
      )}
    </CardContainer>
  )
}