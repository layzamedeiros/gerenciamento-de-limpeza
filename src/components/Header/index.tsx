import { HeaderContainer, ScreenName, NotificationButton, NotificationIcon } from "./styles";

type Props = {
  title: string;
  showNotificationIcon?: boolean;
}

export function Header({ title,  showNotificationIcon = true }: Props) {
  return (
    <HeaderContainer>
      <ScreenName>{title}</ScreenName>
      {showNotificationIcon && (
        <NotificationButton>
          <NotificationIcon/>
        </NotificationButton>
      )}
    </HeaderContainer>
  )
}