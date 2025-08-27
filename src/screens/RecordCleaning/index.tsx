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

import { fetchSalas, marcarSalaComoLimpa, Sala } from "@services/rooms.service";

type SalaComStatus = Sala & {
  limpeza_pendente: boolean;
};

export function RecordCleaning() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState<number | null>(null);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limpezaIniciada, setLimpezaIniciada] = useState(false);
  const [infoLimpeza, setInfoLimpeza] = useState({
    salaId: 0,
    salaNome: "",
    horaInicio: "",
  });
  const [observacao, setObservacao] = useState("");

  const loadSalas = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchSalas();
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
    loadSalas();
  }, [loadSalas]);

  const dropdownItems = useMemo(() => {
    return salas
      .filter((sala) => sala.status_limpeza === "Limpeza Pendente")
      .map((sala) => ({
        label: sala.nome_numero,
        value: sala.id,
      }));
  }, [salas]);

  const handleIniciarLimpeza = () => {
    if (salaSelecionada) {
      const salaInfo = salas.find((sala) => sala.id === salaSelecionada);
      const nomeSala = salaInfo ? salaInfo.nome_numero : "Sala desconhecida";
      const horaAtual = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setInfoLimpeza({
        salaId: salaSelecionada,
        salaNome: nomeSala,
        horaInicio: horaAtual,
      });
      setLimpezaIniciada(true);
    } else {
      Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "Por favor, selecione uma sala primeiro.",
      });
    }
  };

  const handleFinalizarLimpeza = async () => {
    setIsLoading(true);
    try {
      await marcarSalaComoLimpa(infoLimpeza.salaId);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: `A limpeza da "${infoLimpeza.salaNome}" foi registrada.`,
      });

      await loadSalas();

      setLimpezaIniciada(false);
      setSalaSelecionada(null);
      setObservacao("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível registrar a limpeza. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
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
      <Header title="Registrar limpeza" />
      <Content>
        {!limpezaIniciada ? (
          <>
            <Title>Salas com limpeza pendente</Title>
            <DropDownPicker
              open={open}
              value={salaSelecionada}
              items={dropdownItems}
              setOpen={setOpen}
              setValue={setSalaSelecionada}
              placeholder="Selecionar sala"
              ListEmptyComponent={() => (
                <View style={{ padding: 15, alignItems: "center" }}>
                  <Text style={{ color: theme.COLORS.TITLE, fontSize: 16 }}>
                    Nenhuma sala com limpeza pendente
                  </Text>
                </View>
              )}
              listMode="FLATLIST"
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
            <Button onPress={handleIniciarLimpeza} disabled={isLoading}>
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
            <Button
              variant="success"
              onPress={handleFinalizarLimpeza}
              disabled={isLoading}
            >
              {isLoading ? (
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
