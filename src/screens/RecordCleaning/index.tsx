import { Header } from "@components/Header";
import { Button, ButtonText, CleaningContainer, CleaningDetails, CleaningDetailsTime, Container, Content, ObservationInput, ObservationTitle, Title } from "./styles";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "styled-components/native";
import { Alert } from "react-native";

const DADOS_SALAS = [
  { label: 'Laboratório de Informática 02', value: 'lab_info_02' },
  { label: 'Laboratório de Informática 03', value: 'lab_info_03' },
  { label: 'Teórica 06', value: 'teorica_02' },
];

export function RecordCleaning() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [items, setItems] = useState(DADOS_SALAS);

  const [limpezaIniciada, setLimpezaIniciada] = useState(false);
  const [infoLimpeza, setInfoLimpeza] = useState({ sala: '', horaInicio: '' });
  const [observacao, setObservacao] = useState('');

  const handleIniciarLimpeza = () => {
  if (salaSelecionada) {
    const salaInfo = DADOS_SALAS.find(sala => sala.value === salaSelecionada);
    const nomeSala = salaInfo ? salaInfo.label : 'Sala desconhecida';
    
    const horaAtual = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    setInfoLimpeza({ sala: nomeSala, horaInicio: horaAtual });
    setLimpezaIniciada(true); 

  } else {
    Alert.alert('Atenção', 'Por favor, selecione uma sala primeiro.');
  }
};

  const handleFinalizarLimpeza = () => {
    console.log('Finalizando limpeza...');
    console.log('Sala:', infoLimpeza.sala);
    console.log('Observação:', observacao);
    
    setLimpezaIniciada(false);
    setSalaSelecionada(null);
    setObservacao('');
  };

   return (
    <Container>
      <Header title="Registrar limpeza"/>
      
      <Content>
        { !limpezaIniciada ? (
          <>
            <Title>Salas de aula</Title>
            <DropDownPicker
              open={open}
              value={salaSelecionada}
              items={items}
              setOpen={setOpen}
              setValue={setSalaSelecionada}
              setItems={setItems}
              placeholder="Selecionar sala"
              zIndex={3000}          
              zIndexInverse={1000}
              
              style={{
                backgroundColor: theme.COLORS.WHITE,   
                borderColor: theme.COLORS.BORDER,    
                borderWidth: 1,
              }}
              dropDownContainerStyle={{
                backgroundColor: theme.COLORS.WHITE,
                borderColor: theme.COLORS.BORDER,
                borderWidth: 1,
              }}
              placeholderStyle={{
                color: theme.COLORS.TITLE,
              }}
              textStyle={{
                fontSize: 16,
                color: theme.COLORS.TITLE,
              }}
              
            />
            <Button onPress={handleIniciarLimpeza}>
              <ButtonText>Iniciar Limpeza</ButtonText>
            </Button>
          </>
        ) : (
          <CleaningContainer>
            <Title>Limpeza iniciada</Title>
            <CleaningDetails>{infoLimpeza.sala}</CleaningDetails>
            <CleaningDetailsTime>
              Limpeza Iniciada às {infoLimpeza.horaInicio}
            </CleaningDetailsTime>
            
            <ObservationTitle>Observação</ObservationTitle>
            <ObservationInput
              placeholder="Digite uma observação"
              value={observacao}
              onChangeText={setObservacao}
            />
            
            <Button variant="success" onPress={handleFinalizarLimpeza}>
              <ButtonText>Finalizar limpeza</ButtonText>
            </Button>
          </CleaningContainer>
        )}
      </Content>
    </Container>
  );
}