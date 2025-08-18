import { CardContainer, StatusContainer, StatusTitle, CardContent, Title, SubTitle } from "./styles";

type Props = {
  title: string;
  subtitle?: string;
  statustitle?: string;
  status?: "limpa" | "pendente";
}

export function CardRoom({ title, subtitle, statustitle, status }: Props) {
  return (
    <CardContainer>
      {/* Esta lógica só será executada se 'status' for fornecido */}
      {status && (
        <StatusContainer status={status}> 
          <StatusTitle>
            {/* Usa o 'statustitle' se ele existir, senão usa o padrão */}
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
    </CardContainer>
  )
}