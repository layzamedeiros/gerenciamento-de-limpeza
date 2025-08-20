import { UserType } from "App";
import { CardContainer, StatusContainer, StatusTitle, CardContent, Title, SubTitle, IconContainer } from "./styles";
import { PencilSimpleIcon, TrashIcon } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  statustitle?: string;
  status?: "limpa" | "pendente";
  userType?: UserType;
}

export function CardRoom({ title, subtitle, statustitle, status, userType="admin" }: Props) {
  return (
    <CardContainer>
      {status && (
        <StatusContainer status={status}> 
          <StatusTitle>
            {statustitle || (status === "limpa" ? "Limpa" : "Pendente")}
          </StatusTitle>
        </StatusContainer>
      )}

      <CardContent>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        <SubTitle>Capacidade: 20</SubTitle>
        <SubTitle>Descrição: Sala informática desktop</SubTitle>
        <SubTitle>Última limpeza: 2025/07/31</SubTitle>
      </CardContent>
       {userType === "admin" && ( 
        <IconContainer>
          <TouchableOpacity onPress={() => {}}>
            <PencilSimpleIcon color="#6B7280" size={24} /> 
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {}}>
            <TrashIcon color="#6B7280" size={24} />
          </TouchableOpacity>
        </IconContainer>
      )} 
      

    </CardContainer>
  )
}