import React, { useState } from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  height: 30px;
  flex-direction: row;
  gap: 10px;
`;

export const Button = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 5px 26px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.COLORS.PRIMARY : 'transparent'};
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const ButtonText = styled.Text<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? theme.COLORS.WHITE : theme.COLORS.PRIMARY};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  font-size: 14px;
`;