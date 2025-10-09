import React from 'react';
import { Container, Button, ButtonText } from './styles';

export type FilterStatus = 'todas' | 'pendentes' | 'limpas' | 'limpeza urgente' | 'limpeza em andamento';

type Props = {
  activeFilter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

export default function FilterButton({ activeFilter, onFilterChange }: Props) {
  const buttons: { label: string, status: FilterStatus }[] = [
    { label: 'Todas', status: 'todas' },
    { label: 'Pendentes', status: 'pendentes' },
    { label: 'Limpas', status: 'limpas' },
  ];

  return (
    <Container>
      {buttons.map((button) => (
        <Button
          key={button.status}
          selected={activeFilter === button.status}
          onPress={() => onFilterChange(button.status)}
        >
          <ButtonText selected={activeFilter === button.status}>
            {button.label}
          </ButtonText>
        </Button>
      ))}
    </Container>
  );
}