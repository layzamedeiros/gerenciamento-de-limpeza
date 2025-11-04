
import {
  CardContainer, Title, SubTitle, InfoContainer, TagContainer, TagText
} from "./styles";

type RoleType = 'admin' | 'collaborator' | 'zeladoria';

type Props = {
  title: string;
  subtitle?: string;
  roleLabel: string;
}

export function CardEmployees({ title, subtitle, roleLabel }: Props) {
  const tagType: RoleType =
    roleLabel.toLowerCase() === 'admin'
      ? 'admin'
      : roleLabel.toLowerCase() === 'zeladoria'
        ? 'zeladoria'
        : 'collaborator';
  return (
    <CardContainer>
      <InfoContainer>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </InfoContainer>

      <TagContainer type={tagType}>
        <TagText type={tagType}>{roleLabel}</TagText>
      </TagContainer>
    </CardContainer>
  )
}