import { Modal, ModalProps } from "react-native";
import { CapacityContainer, CleanFilterButton, CleanFilterText, InputContainer, Label, LabelContainer, ModalButton, ModalButtons, ModalButtonText, ModalContainer, ModalOverlay, ModalTitle, StatusRoomButton, StatusRoomButtonContainer, StatusRoomText } from "./styles";
import { FormInput } from "@components/FormInput";
import { Dropdown } from "@components/Dropdowm";

type Props = ModalProps & {
  onClose: () => void;
}

export function FilterAdvancedRooms({ onClose, ...rest }: Props) {
  return (
    <Modal transparent={true} animationType="fade" {...rest}>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Filtros Avançados</ModalTitle>

          <InputContainer>
            <LabelContainer>
              <Label>Status da sala</Label>

              <CleanFilterButton>
                <CleanFilterText>Limpar filtros</CleanFilterText>
              </CleanFilterButton>
            </LabelContainer>

            <StatusRoomButtonContainer>
              <StatusRoomButton>
                <StatusRoomText>Todas</StatusRoomText>
              </StatusRoomButton>

              <StatusRoomButton>
                <StatusRoomText>Ativa</StatusRoomText>
              </StatusRoomButton>

              <StatusRoomButton>
                <StatusRoomText>Inativa</StatusRoomText>
              </StatusRoomButton>
            </StatusRoomButtonContainer>
          </InputContainer>

          <InputContainer>
            <Label>Capacidade</Label>

            <CapacityContainer>
              <FormInput 
                inputName="Mínimo" 
                placeholder="Ex: 5"
                flex={1}
              />
              <FormInput 
                inputName="Máximo" 
                placeholder="Ex: 50"
                flex={1}
              />
            </CapacityContainer>
          </InputContainer>

          <InputContainer>
            <Label>Responsável</Label>

            <Dropdown 
              
            />
          </InputContainer>

          <ModalButtons>
            <ModalButton variant="cancel" onPress={onClose}>
              <ModalButtonText variant="cancel">Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              variant="success"
              // onPress={handleSubmit(handleCreateRoom)}
              // disabled={isCreating}
            >
              {/* {isCreating ? (
                <ActivityIndicator color="#FFF" />
              ) : ( */}
                <ModalButtonText variant="success">Filtrar</ModalButtonText>
              {/* //  */}
            </ModalButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
}