import { HeaderContainer, ScreenName, NotificationButton, NotificationIcon } from "./styles";

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  return (
    <HeaderContainer>
      <ScreenName>{title}</ScreenName>
      <NotificationButton>
        <NotificationIcon/>
      </NotificationButton>
    </HeaderContainer>
  )
}