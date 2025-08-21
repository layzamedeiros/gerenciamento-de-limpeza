import { CardContainer, StatusContainer, StatusTitle, CardContent, Title, SubTitle } from "./styles";
import { format,  parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Props = {
  status: 'limpa' | 'pendente';
  statustitle: string;
  title: string;
  capacidade: number;
  descricao: string;
  ultimaLimpeza: string | null;
}

export function CardRoom({ title, status, capacidade, descricao, ultimaLimpeza }: Props) {
  const formatarData = (data: string | null) => {
    if (!data) {
      return "Limpeza pendente" ;
    }
    try {
      const dataObj = parseISO(data);
      return format(dataObj, "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };
  return (
    <CardContainer>
      <StatusContainer status={status}> 
        <StatusTitle>
          {status === "limpa" ? "Limpa" : "Pendente"}
        </StatusTitle>
      </StatusContainer>

      <CardContent>
        <Title>{title}</Title>
        <SubTitle>Capacidade: {capacidade}</SubTitle>
        <SubTitle>Descrição: {descricao}</SubTitle>
        <SubTitle>Última limpeza: {formatarData(ultimaLimpeza)}</SubTitle>
      </CardContent>
    </CardContainer>
  )
}