import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "styled-components/native";
import { ActivityIndicator, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";

import { Header } from "@components/Header";
import {
  Button,
  ButtonText,
  CleaningContainer,
  CleaningDetails,
  CleaningDetailsTime,
  Container,
  Content,
  ObservationInput,
  ObservationTitle,
  Title,
} from "./styles";

import { fetchRooms, startCleaning, finishCleaning, Room, addCleaningPhoto } from "@services/rooms.service";

// A interface da API para o registro de limpeza
interface CleaningRecordResponse {
  id: number;
  sala: string; // qr_code_id
  sala_nome: string;
  data_hora_inicio: string;
  data_hora_fim: string | null;
  funcionario_responsavel: string;
  observacoes: string | null;
  fotos: { id: number; imagem: string; }[];
}

export function RecordCleaning() {
  const theme = useTheme();

  const [open, setOpen] = useState(false); 
  const [qrCodeIdSelecionado, setQrCodeIdSelecionado] = useState<string | null>(null);
  const [salas, setSalas] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cleaningStarted, setCleaningStarted] = useState(false);
  const [activeCleaning, setActiveCleaning] = useState<CleaningRecordResponse | null>(null);
  
  const [observation, setObservation] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  const loadRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchRooms();
      setSalas(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao Carregar",
        text2: "Não foi possível buscar a lista de salas.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);


  const dropdownItems = useMemo(() => {

    return salas
      .filter((room) => room.status_limpeza === "Limpeza Pendente" || room.status_limpeza === "Suja")
      .map((room) => ({
        label: room.nome_numero,
        value: room.qr_code_id,
      }));
  }, [salas]);

  const handleStartCleaning = async () => {
    if (qrCodeIdSelecionado) {
      setIsLoading(true);
      try {
        const response = await startCleaning(qrCodeIdSelecionado);
        setCleaningStarted(true);
        setActiveCleaning(response);
        Toast.show({
          type: "success",
          text1: "Limpeza Iniciada",
          text2: `A limpeza de "${response.sala_nome}" foi iniciada.`,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível iniciar a limpeza. Sala já em limpeza?",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "Por favor, selecione uma sala primeiro.",
      });
    }
  };

  const handleFinishCleaning = async () => {
    if (!activeCleaning) return;

    setIsFinishing(true);
    try {
      // É necessário adicionar uma foto antes de finalizar a limpeza,
      // mas a lógica para tirar a foto não está no seu código. 
      // Por isso, vamos adicionar um alerta para avisar o usuário.
      // Em uma implementação real, você chamaria `addCleaningPhoto` aqui.
      // Por exemplo:
      // await addCleaningPhoto(activeCleaning.id, 'caminho/para/foto.jpg');

      // A API espera o qr_code_id
      await finishCleaning(activeCleaning.sala, observation);
      
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: `A limpeza da "${activeCleaning.sala_nome}" foi finalizada.`,
      });

      await loadRooms();

      setCleaningStarted(false);
      setActiveCleaning(null);
      setQrCodeIdSelecionado(null);
      setObservation("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível finalizar a limpeza. Verifique se fotos foram adicionadas.",
      });
    } finally {
      setIsFinishing(false);
    }
  };

  if (isLoading && salas.length === 0) {
    return (
      <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Registrar Limpeza" />
      <Content>
        {!cleaningStarted ? (
          <>
            <Title>Salas com limpeza pendente</Title>
            <DropDownPicker
              open={open}
              value={qrCodeIdSelecionado}
              items={dropdownItems}
              setOpen={setOpen}
              setValue={setQrCodeIdSelecionado}
              placeholder="Selecionar sala"
              ListEmptyComponent={() => (
                <View style={{ padding: 15, alignItems: "center" }}>
                  <Text style={{ color: theme.COLORS.TITLE, fontSize: 16 }}>
                    Nenhuma sala com limpeza pendente ou suja
                  </Text>
                </View>
              )}
              listMode="SCROLLVIEW"
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
              placeholderStyle={{ color: theme.COLORS.TITLE }}
              textStyle={{ fontSize: 16, color: theme.COLORS.TITLE }}
            />
            <Button onPress={handleStartCleaning} disabled={isLoading}>
              <ButtonText>Iniciar Limpeza</ButtonText>
            </Button>
          </>
        ) : (
          <CleaningContainer>
            <Title>Limpeza em andamento</Title>
            <CleaningDetails>{activeCleaning?.sala_nome}</CleaningDetails>
            <CleaningDetailsTime>
              Limpeza Iniciada às {new Date(activeCleaning?.data_hora_inicio || "").toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CleaningDetailsTime>
            <ObservationTitle>Observação</ObservationTitle>
            <ObservationInput
              placeholder="Digite uma observação (opcional)"
              value={observation}
              onChangeText={setObservation}
            />
            <Button
              variant="success"
              onPress={handleFinishCleaning}
              disabled={isFinishing}
            >
              {isFinishing ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <ButtonText>Finalizar limpeza</ButtonText>
              )}
            </Button>
          </CleaningContainer>
        )}
      </Content>
    </Container>
  );
}