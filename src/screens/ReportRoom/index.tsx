import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, Alert, StyleSheet, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { CameraView, BarcodeScanningResult, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

import { Header } from '@components/Header';
import { 
  Container, 
  Content, 
  Title, 
  SubTitle, 
  ScanMarker,
  ReportButton,
  InfoCard,
  InfoCardTextContainer,
  InfoCardIconContainer,
  ReportButtonText,
  SeparatorText,
  ScannerIconText,
  ScannerIconBox,
  ScannerButton
} from './styles';

import { BroomIcon, CornersOut, QrCodeIcon } from 'phosphor-react-native'; 

import { ReportModal } from '@components/ReportModal'; 

import { Room, fetchRooms, reportDirtyRoom } from '@services/rooms.service';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, 
    backgroundColor: 'black', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject
  },
  modalButton: {
    padding: 10,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export function ReportRoom() {
  const theme = useTheme();
  
  const [open, setOpen] = useState(false);
  const [qrCodeIdSelecionado, setQrCodeIdSelecionado] = useState<string | null>(null);
  const [salas, setSalas] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const refreshRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchRooms();
      setSalas(data);
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro ao carregar salas" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshRooms();
    }, [refreshRooms]) 
  );

  const dropdownItems = useMemo(() => {
    return salas
      .filter((room) => 
        room.ativa && 
        (room.status_limpeza === 'Limpa' || room.status_limpeza === 'Limpeza Pendente')
      )
      .map((room) => ({ label: room.nome_numero, value: room.qr_code_id }));
  }, [salas]);

  const handleOpenReportModal = (sala: Room) => {
    if (sala.status_limpeza === 'Suja' || sala.status_limpeza === 'Em Limpeza') {
      Toast.show({ type: 'info', text1: 'Ação não necessária', text2: 'Esta sala já foi reportada.' });
      return;
    }
    setSelectedRoom(sala);
    setReportModalVisible(true);
  };

  const handleCloseReportModal = () => {
    setReportModalVisible(false);
    setIsReporting(false);
    setSelectedRoom(null);
    setQrCodeIdSelecionado(null); 
  };

  const handleConfirmReportRoom = async (observacao: string) => {
    if (!selectedRoom) return;

    setIsReporting(true);
    try {
      await reportDirtyRoom(selectedRoom.qr_code_id, observacao);
      Toast.show({
        type: 'success',
        text1: 'Solicitação Enviada',
        text2: `A sala "${selectedRoom.nome_numero}" foi reportada.`
      });
      await refreshRooms(); 
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Não foi possível reportar esta sala.";
      Toast.show({ type: 'error', text1: 'Erro', text2: errorMessage });
    } finally {
      handleCloseReportModal();
    }
  };
  
  const handleReportarPeloDropdown = () => {
    if (!qrCodeIdSelecionado) {
      Toast.show({ type: 'info', text1: 'Selecione uma sala' });
      return;
    }
    const sala = salas.find(s => s.qr_code_id === qrCodeIdSelecionado);
    if (sala) {
      handleOpenReportModal(sala); 
    }
  };

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    setScannerVisible(false);
    const qrCodeId = scanningResult.data;
    const sala = salas.find(s => s.qr_code_id === qrCodeId);

    if (!sala) {
      Toast.show({ type: 'error', text1: 'Sala não encontrada' });
      return;
    }
    if (!sala.ativa) {
      Toast.show({ type: 'error', text1: 'Ação não permitida', text2: 'Esta sala está inativa.' });
      return;
    }
    handleOpenReportModal(sala);
  };

  const handleAbrirScanner = async () => {
    if (permission && permission.granted) {
      setScannerVisible(true);
      return;
    }
    const response = await requestPermission();
    if (response.granted) {
      setScannerVisible(true);
    } else {
      Alert.alert("Permissão Negada", "Você precisa permitir o acesso à câmera.");
    }
  };

  return (
    <Container>
      <Header title="Reportar Sala" showNotificationIcon={false} />
      
      <Content>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} style={{marginTop: 50}} />
        ) : (
          <>
            <InfoCard>
              <InfoCardTextContainer>
                <Title>Encontrou uma sala que precisa de limpeza?</Title>
              </InfoCardTextContainer>
              <InfoCardIconContainer>
                <BroomIcon size={50} weight='fill' color={theme.COLORS.ACCENT} />
              </InfoCardIconContainer>
            </InfoCard>

            <SubTitle>
              Selecione a sala que precisa de limpeza na lista abaixo ou escaneie o QR Code.
            </SubTitle>
            
            <DropDownPicker
              open={open}
              value={qrCodeIdSelecionado}
              items={dropdownItems}
              setOpen={setOpen}
              setValue={setQrCodeIdSelecionado}
              placeholder="Selecione uma sala na lista"
              ListEmptyComponent={() => (
                <View style={{ padding: 15, alignItems: "center" }}>
                  <Text style={{ color: theme.COLORS.TITLE }}>Nenhuma sala disponível para reportar</Text>
                </View>
              )}
              listMode="SCROLLVIEW"
              zIndex={3000}
              zIndexInverse={1000}
              style={{ borderColor: theme.COLORS.BORDER, marginBottom: 10, minHeight: 50, paddingHorizontal: 15 }}
              placeholderStyle={{ color: theme.COLORS.PLACEHOLDER, fontSize: 16 }}
              textStyle={{ fontSize: 16, color: theme.COLORS.TITLE }}
              dropDownContainerStyle={{ borderColor: theme.COLORS.BORDER }}
            />
            
            <ReportButton 
              onPress={handleReportarPeloDropdown} 
              disabled={isReporting || !qrCodeIdSelecionado}
            >
              {isReporting ? 
                <ActivityIndicator color="#FFF" /> : 
                <ReportButtonText>Reportar Sala Selecionada</ReportButtonText>
              }
            </ReportButton>

            <SeparatorText>OU</SeparatorText>

            <ScannerButton onPress={handleAbrirScanner}>
              
              <ScannerIconBox>
                
                <QrCodeIcon 
                  size={100} 
                  color={theme.COLORS.PRIMARY} 
                  weight="light" 
                /> 
                
                <CornersOut
                  size={180} 
                  color={theme.COLORS.PRIMARY} 
                  weight="thin" 
                  style={{ position: 'absolute' }} 
                />

              </ScannerIconBox>

              <ScannerIconText>Escanear QR Code</ScannerIconText>
            </ScannerButton>
          </>
        )}
      </Content>

      <Modal visible={isScannerVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CameraView
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            style={styles.absoluteFill}
          />
          <ScanMarker />
          <TouchableOpacity style={styles.modalButton} onPress={() => setScannerVisible(false)}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ReportModal
        visible={isReportModalVisible}
        onClose={handleCloseReportModal}
        onConfirm={handleConfirmReportRoom}
        sala={selectedRoom}
        isLoading={isReporting}
      />
    </Container>
  );
}