import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Header } from "@components/Header";
import { Button, ButtonText, CleaningContainer, CleaningDetails, CleaningDetailsTime, Container, Content, ObservationInput, ObservationTitle, Title } from "./styles";

import { fetchSalas, marcarSalaComoLimpa, Sala } from '@services/roomsService';

export function RecordCleaning() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState<number | null>(null);
  
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [limpezaIniciada, setLimpezaIniciada] = useState(false);
  const [infoLimpeza, setInfoLimpeza] = useState({ salaId: 0, salaNome: '', horaInicio: '' });
  const [observacao, setObservacao] = useState('');

  useEffect(() => {
    async function loadSalas() {
      try {
        const data = await fetchSalas();
        setSalas(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar la lista de salas.');
      } finally {
        setIsLoading(false);
      }
    }
    loadSalas();
  }, []);

  const dropdownItems = useMemo(() => {
    return salas.map(sala => ({
      label: sala.nome_numero,
      value: sala.id
    }));
  }, [salas]);

  const handleIniciarLimpeza = () => {
    if (salaSelecionada) {
      const salaInfo = salas.find(sala => sala.id === salaSelecionada);
      const nomeSala = salaInfo ? salaInfo.nome_numero : 'Sala desconhecida';
      
      const horaAtual = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit'
      });

      setInfoLimpeza({ salaId: salaSelecionada, salaNome: nomeSala, horaInicio: horaAtual });
      setLimpezaIniciada(true); 
    } else {
      Alert.alert('Atenção', 'Por favor, selecione uma sala primeiro.');
    }
  };

  const handleFinalizarLimpeza = async () => {
    setIsLoading(true);
    try {
      await marcarSalaComoLimpa(infoLimpeza.salaId);
      
      Alert.alert('Sucesso!', `A limpeza da "${infoLimpeza.salaNome}" foi registrada.`);
      
      setLimpezaIniciada(false);
      setSalaSelecionada(null);
      setObservacao('');
      navigation.goBack();

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar a limpeza. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && salas.length === 0) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </Container>
    );
  }

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
              items={dropdownItems} 
              setOpen={setOpen}
              setValue={setSalaSelecionada}
              setItems={() => {}} 
              placeholder="Selecionar sala"
              zIndex={3000}             
              zIndexInverse={1000}
              
              // SEU ESTILO ORIGINAL MANTIDO
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
            <Title>Limpeza em andamento</Title>
            <CleaningDetails>{infoLimpeza.salaNome}</CleaningDetails>
            <CleaningDetailsTime>
              Limpeza Iniciada às {infoLimpeza.horaInicio}
            </CleaningDetailsTime>
            
            <ObservationTitle>Observação</ObservationTitle>
            <ObservationInput
              placeholder="Digite uma observação (opcional)"
              value={observacao}
              onChangeText={setObservacao}
            />
            
            <Button variant="success" onPress={handleFinalizarLimpeza} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#FFF" /> : <ButtonText>Finalizar limpeza</ButtonText>}
            </Button>
          </CleaningContainer>
        )}
      </Content>
    </Container>
  );
}