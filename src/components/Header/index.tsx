import { useNavigation } from "@react-navigation/native";
import { HeaderContainer, ScreenName, NotificationButton, NotificationIcon } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppRoutesParamList } from "@routes/app.routes";
import { useAuth } from "@contexts/AuthContext"; // Importe o hook

type Props = {
  title: string;
  showNotificationIcon?: boolean;
}

export function Header({ title,  showNotificationIcon = true }: Props) {
  const navigation = useNavigation<StackNavigationProp<AppRoutesParamList>>();
  
  return (
    <HeaderContainer>
      <ScreenName>{title}</ScreenName>

      {showNotificationIcon && (
        <NotificationButton  onPress={() => navigation.navigate("Notification")} >
          <NotificationIcon/>
        </NotificationButton>
      )}
    </HeaderContainer>
  )
}