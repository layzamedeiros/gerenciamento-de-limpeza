import React from 'react';
import { Container, Button, ButtonText } from './styles';

export type UserFilterStatus = 'todas' | 'colaborador' | 'admin';
export type ApiKey = 'is_superuser' | undefined;
export type ApiValue = 'true' | 'false' | undefined;

type FilterButtonConfig = {
  label: string;
  status: UserFilterStatus;
  keyName: ApiKey;
  keyValue: ApiValue;
};

type Props = {
  activeFilter: UserFilterStatus;
  onFilterChange: (status: UserFilterStatus, keyName: ApiKey, keyValue: ApiValue) => void;
}

export function FilterUserButton({ activeFilter, onFilterChange }: Props) {
  const buttons: FilterButtonConfig[] = [
    { label: 'Todos', status: 'todas', keyName: undefined, keyValue: undefined },
    { label: 'Funcionário', status: 'colaborador', keyName: 'is_superuser', keyValue: 'false' },
    { label: 'Admin', status: 'admin', keyName: 'is_superuser', keyValue: 'true' },
  ];

  return (
    <Container>
      {buttons.map((button) => (
        <Button
          key={button.status}
          selected={activeFilter === button.status}
          onPress={() => onFilterChange(button.status, button.keyName, button.keyValue)}
        >
          <ButtonText selected={activeFilter === button.status}>
            {button.label}
          </ButtonText>
        </Button>
      ))}
    </Container>
  );
}