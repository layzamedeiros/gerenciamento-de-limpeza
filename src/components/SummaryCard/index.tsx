import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { WarningIcon } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';

import { SummaryCardContainer, TextContent, SummaryTitle, SummarySubtitle, IconContainer, DetailsButton, DetailsButtonText } from './styles';

type Props = TouchableOpacityProps & {
  pendingRoomsCount: number;
  onStartCleaning: () => void;
};

export function SummaryCard({ pendingRoomsCount, onStartCleaning, ...rest }: Props) {
  const theme = useTheme();

  return (
    <SummaryCardContainer {...rest} style={{ boxShadow: `0px 0.5px 3px ${theme.COLORS.BLACK_SHADOW}` }}>
      <TextContent>
        <SummaryTitle>Resumo das Tarefas</SummaryTitle>
        <SummarySubtitle>
          {pendingRoomsCount} Salas com limpeza pendente
        </SummarySubtitle>
        <DetailsButton onPress={onStartCleaning}>
          <DetailsButtonText>Ver mais</DetailsButtonText>
        </DetailsButton>
      </TextContent>
      <IconContainer>
        <WarningIcon size={63} color={theme.COLORS.ACCENT} />
      </IconContainer>
    </SummaryCardContainer>
  );
}