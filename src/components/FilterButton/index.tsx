import React, { useState } from 'react';
import { Container, Button, ButtonText } from './styles';


export default function FilterButton() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['Todas', 'Pendentes', 'Limpas'];

  return (
    <Container>
      {buttons.map((label, index) => (
        <Button
          key={index}
          selected={selectedIndex === index}
          onPress={() => setSelectedIndex(index)}
          style={{ marginHorizontal: 8 }} 
        >
          <ButtonText selected={selectedIndex === index}>
            {label}
          </ButtonText>
        </Button>
      ))}
    </Container>
  );
}
