import { CardContainer, StatusContainer, StatusTitle, CardContent, Title, SubTitle } from "./styles";

type Props = {
  title: string;
  subtitle?: string;
  statustitle: string;
  status: "limpa" | "pendente";
}

export function CardRoom({ title, status }: Props) {
  return (
    <CardContainer>
      <StatusContainer status={status}> 
        <StatusTitle>
          {status === "limpa" ? "Limpa" : "Pendente"}
        </StatusTitle>
      </StatusContainer>

      <CardContent>
        <Title>{title}</Title>
        <SubTitle>Capacidade: 20</SubTitle>
        <SubTitle>Descrição: Sala informática desktop</SubTitle>
        <SubTitle>Última limpeza: 2025/07/31</SubTitle>
      </CardContent>
    </CardContainer>
  )
}