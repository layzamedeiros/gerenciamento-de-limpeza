import { CardContainer, Title, SubTitle } from "./styles";

type Props = {
  title: string;
  subtitle?: string;
}

export function CardEmployees({ title, subtitle }: Props) {
  return (
    <CardContainer>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </CardContainer>
  )
}