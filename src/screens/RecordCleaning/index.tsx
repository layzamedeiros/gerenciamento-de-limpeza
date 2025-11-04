import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { useTheme } from "styled-components/native";
import { ActivityIndicator, View, Text, Modal, Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import { CameraView, BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Container, Content, Title, Button as StyledButton, ButtonText, ScanButton, ScanButtonText, InProgressContainer, SectionTitle, InfoRow, InfoLabel, InfoValue, ObservationInput, PhotoGrid, Thumbnail, AddPhotoButton, FinishButton, FinishButtonText, FullScreen, CameraControls, CaptureButton, ScanMarker, ModalButton, ModalButtonText, SubTitle, DetailsContainer, RemovePhotoButtonText, RemovePhotoButton, PhotoContainer } from "./styles";
import { CameraIcon, QrCodeIcon } from "phosphor-react-native";

import { Room, CleaningRecord as CleaningRecordResponse, fetchRooms, startCleaning, addCleaningPhoto, finishCleaning, deleteCleaningPhoto } from "@services/rooms.service";

export function RecordCleaning() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [qrCodeIdSelecionado, setQrCodeIdSelecionado] = useState<string | null>(null);
  const [salas, setSalas] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [activeCleaning, setActiveCleaning] = useState<CleaningRecordResponse | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); 
  const [observation, setObservation] = useState("");
  const [photos, setPhotos] = useState<{ id: number; uri: string }[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (activeCleaning === null) {
        return;
      }

      e.preventDefault();
      Alert.alert(
        'Limpeza em Andamento',
        'Você precisa finalizar a limpeza atual antes de sair desta tela.',
        [{ text: 'OK' }]
      );
    });

    return unsubscribe;
  }, [navigation, activeCleaning]);
  
  const resetCleaningState = () => {
    setActiveCleaning(null);
    setSelectedRoom(null);
    setPhotos([]);
    setObservation("");
    setQrCodeIdSelecionado(null);
  };

  useFocusEffect(
    useCallback(() => {
      const loadRooms = async () => {
        try {
          setIsLoading(true);
          const data = await fetchRooms();
          setSalas(data);
        } catch (error) {
          Toast.show({ type: "error", text1: "Erro ao carregar salas" });
        } finally {
          setIsLoading(false);
          if (activeCleaning === null) { 
            resetCleaningState();
          }
        }
      };
      if (activeCleaning === null) {
         loadRooms();
      }
    }, [activeCleaning])
  );

  const dropdownItems = useMemo(() => {
    return salas
      .filter((room) => room.ativa && (room.status_limpeza === "Limpeza Pendente" || room.status_limpeza === "Suja"))
      .map((room) => ({ label: room.nome_numero, value: room.qr_code_id }));
  }, [salas]);

  useEffect(() => {
    if (qrCodeIdSelecionado) {
      const roomDetails = salas.find(r => r.qr_code_id === qrCodeIdSelecionado);
      setSelectedRoom(roomDetails || null);
    } else {
      setSelectedRoom(null);
    }
  }, [qrCodeIdSelecionado, salas]);


  const handleStartCleaning = async (qrCodeId: string | null) => {
    if (!qrCodeId) {
      Toast.show({ type: "error", text1: "Atenção", text2: "Selecione uma sala ou escaneie." });
      return;
    }

    try {
      setIsLoading(true);
      const response = await startCleaning(qrCodeId);
      const room = salas.find((r) => r.qr_code_id === qrCodeId);
      setSelectedRoom(room || null); 

      const newRecord: CleaningRecordResponse = {
        id: response.id,
        sala: qrCodeId,
        sala_nome: room?.nome_numero || "",
        data_hora_inicio: response.data_hora_inicio,
        data_hora_fim: response.data_hora_fim,
        funcionario_responsavel: response.funcionario_responsavel,
        observacoes: response.observacoes,
        fotos: response.fotos || [],
      };

      setActiveCleaning(newRecord);
      Toast.show({ type: "success", text1: "Limpeza Iniciada", text2: `Sala: ${newRecord.sala_nome}` });
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro", text2: "Falha ao iniciar limpeza." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    setScannerVisible(false);
    const scannedQr = scanningResult.data;
    const roomExists = salas.find(r => r.qr_code_id === scannedQr);

    if (roomExists && roomExists.ativa && (roomExists.status_limpeza === "Limpeza Pendente" || roomExists.status_limpeza === "Suja")) {
      handleStartCleaning(scannedQr);
    } else {
      Toast.show({ type: "error", text1: "Ação não permitida", text2: "Esta sala não está ativa ou não requer limpeza no momento." });
    }
  };

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleTakePicture = async () => {
    if (photos.length >= 3) {
      Alert.alert("Limite Atingido", "Máximo de 3 fotos por registro.");
      return;
    }

    try {
      setIsUploadingPhoto(true);
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
      if (photo && activeCleaning) {
        const newPhoto = await addCleaningPhoto(activeCleaning.id, photo.uri);
        setPhotos((prev) => [...prev, { id: newPhoto.id, uri: photo.uri }]); 
        Toast.show({ type: "success", text1: "Foto enviada!" });
      }
    } catch {
      Toast.show({ type: "error", text1: "Erro ao enviar foto." });
    } finally {
      setIsUploadingPhoto(false);
      setCameraVisible(false); 
    }
  };

  const handleRemovePhoto = async (photoId: number) => {
    Alert.alert(
      "Remover Foto",
      "Tem certeza que deseja remover esta foto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCleaningPhoto(photoId);
              setPhotos((currentPhotos) => currentPhotos.filter((p) => p.id !== photoId));
              Toast.show({ type: "info", text1: "Foto removida" });
            } catch {
              Toast.show({ type: "error", text1: "Erro ao remover foto." });
            }
          },
        },
      ]
    );
  };

  const handleFinishCleaning = async () => {
    if (photos.length === 0) {
      Toast.show({ type: "error", text1: "Atenção", text2: "Adicione pelo menos uma foto." });
      return;
    }

    try {
      setIsFinishing(true);
      if (activeCleaning) {
        await finishCleaning(activeCleaning.sala, observation);
        Toast.show({ type: "success", text1: "Sucesso!", text2: "A limpeza foi finalizada." });
        resetCleaningState();
        setIsLoading(true);
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro ao finalizar limpeza." });
    } finally {
      setIsFinishing(false);
    }
  };

  const handleOpenCamera = async () => {
  if (permission && permission.granted) {
    setCameraVisible(true);
    return;
  }

  const response = await requestPermission();

  if (!response.granted) {
    Alert.alert(
      "Permissão Negada",
      "Você precisa permitir o acesso à câmera para tirar fotos."
    );
    return;
  }

  setCameraVisible(true);
};

  return (
    <Container>
      <Header title="Registrar Limpeza" />
      <Content>
        {isLoading && !activeCleaning ? (
            <ActivityIndicator style={{marginTop: 50}} size="large" color={theme.COLORS.PRIMARY} />
        ) : !activeCleaning ? (
          <>
            <Title>Selecionar Sala</Title>
            <SubTitle>Selecione uma sala da lista ou escaneie o QR Code para começar</SubTitle>
           
            <DropDownPicker
              open={open}
              value={qrCodeIdSelecionado}
              items={dropdownItems}
              setOpen={setOpen}
              setValue={setQrCodeIdSelecionado}
              placeholder="Selecionar na lista"
              ListEmptyComponent={() => (
                <View style={{ padding: 15, alignItems: "center" }}>
                  <Text style={{ color: theme.COLORS.TITLE }}>Nenhuma sala pendente</Text>
                </View>
              )}
              listMode="SCROLLVIEW"
              zIndex={3000} zIndexInverse={1000}
              style={{ borderColor: theme.COLORS.BORDER, marginBottom: 20 }}
              dropDownContainerStyle={{ borderColor: theme.COLORS.BORDER }}
            />
             <ScanButton onPress={() => setScannerVisible(true)}>
              <QrCodeIcon color={theme.COLORS.WHITE} size={35} />
              <ScanButtonText>Escanear QR Code da Sala</ScanButtonText>
            </ScanButton>
            <StyledButton onPress={() => handleStartCleaning(qrCodeIdSelecionado)} disabled={!qrCodeIdSelecionado}>
              <ButtonText>Iniciar Limpeza</ButtonText>
            </StyledButton>
          </>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <InProgressContainer>
              <SectionTitle>Limpeza em andamento</SectionTitle>

              <DetailsContainer>
                <InfoRow>
                  <InfoLabel>Sala</InfoLabel>
                  <InfoLabel>Início</InfoLabel>
                </InfoRow>

                <InfoRow>
                  <InfoValue>{activeCleaning.sala_nome}</InfoValue>
                  <InfoValue>
                    {new Date(activeCleaning.data_hora_inicio).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}h
                  </InfoValue>
                </InfoRow>
              </DetailsContainer>
              {selectedRoom?.instrucoes && (
                <>
                  <InfoLabel>Instruções</InfoLabel>
                  <InfoValue>{selectedRoom.instrucoes}</InfoValue>
                </>
              )}

              <InfoLabel>Observação</InfoLabel>
              <ObservationInput placeholder="Adicionar Observação..." value={observation} onChangeText={setObservation} />
              
              <InfoLabel>Anexar Fotos {photos.length}/3</InfoLabel>
              
              <PhotoGrid>
                {photos.map((photo) => (
                  <PhotoContainer key={photo.id}>
                    <Thumbnail source={{ uri: photo.uri }} />
                    <RemovePhotoButton onPress={() => handleRemovePhoto(photo.id)}>
                      <RemovePhotoButtonText>×</RemovePhotoButtonText>
                    </RemovePhotoButton>
                  </PhotoContainer>
                ))}
                {photos.length < 3 && (
                  <AddPhotoButton onPress={handleOpenCamera}>
                    <CameraIcon  weight="fill" color={theme.COLORS.PRIMARY} size={35}/>
                  </AddPhotoButton>
                )}
              </PhotoGrid>
              <FinishButton onPress={handleFinishCleaning} disabled={isFinishing}>
                {isFinishing ? <ActivityIndicator color="#FFF" /> : <FinishButtonText>Finalizar limpeza</FinishButtonText>}
              </FinishButton>
            </InProgressContainer>
          </ScrollView>
        )}
      </Content>

      <Modal visible={isScannerVisible} animationType="slide">
        <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
          <CameraView
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            style={StyleSheet.absoluteFillObject} 
          />
          <ScanMarker />

          <ModalButton onPress={() => setScannerVisible(false)}>
            <ModalButtonText>Cancelar</ModalButtonText>
          </ModalButton>
        </View>
      </Modal>

      <Modal 
        visible={isCameraVisible} 
        animationType="slide" 
        onRequestClose={() => setCameraVisible(false)}
      >
        <FullScreen>
          {permission?.granted ? (
            <CameraView 
              ref={cameraRef} 
              style={StyleSheet.absoluteFillObject} 
              facing="back" 
            />
          ) : (
            <View style={{flex: 1, backgroundColor: 'black'}} />
          )}
          
          <CameraControls>
             <TouchableOpacity 
               onPress={() => setCameraVisible(false)} 
               style={{marginRight: 100, padding: 10}}
             >
              <Text style={{color: 'white', fontSize: 16}}>Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleTakePicture} 
              disabled={isUploadingPhoto || !permission?.granted}
            >
              {isUploadingPhoto ? <ActivityIndicator color="#FFF" /> : <CaptureButton />}
            </TouchableOpacity>
          </CameraControls>
        </FullScreen>
      </Modal>
    </Container>
  );
}