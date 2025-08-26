import { 
  CardContainer, Title, SubTitle, InfoContainer, TagContainer, TagText 
} from "./styles";

type Props = {
  title: string;
  subtitle?: string;
  isAdmin: boolean;
}

export function CardEmployees({ title, subtitle, isAdmin }: Props) {
  return (
    <CardContainer>
      <InfoContainer>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </InfoContainer>
      
      {isAdmin ? (
        <TagContainer type="admin">
          <TagText type="admin">Admin</TagText>
        </TagContainer>
      ) : (
        <TagContainer type="collaborator">
          <TagText type="collaborator">Colaborador</TagText>
        </TagContainer>
      )}
    </CardContainer>
  )
}