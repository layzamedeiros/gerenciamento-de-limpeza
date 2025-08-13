import { Header } from "@components/Header";
import { Container, ContainerButton, Main, Title } from "./styles";
import { DashboardButton } from "@components/DashboardButton";
import { WarningIcon, ChalkboardTeacherIcon, ClockCountdownIcon } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

export function Home() {
  const theme = useTheme();
  return(
    <Container>
      <Header title="Gerenciamento de limpeza"/>
      <Main>
      <Title>Dashboard</Title>
      <ContainerButton>
        <DashboardButton 
          icon={
            <WarningIcon
              color={theme.COLORS.WHITE}
              size={50}
              weight="fill"
            />
          }
          title="4 Salas com limpeza pendente"
        />

        <DashboardButton 
          progress={70}
          title="Total de salas limpas"
        />

        <DashboardButton 
          title="4 Salas com limpeza pendente"
          icon= {
            <ChalkboardTeacherIcon 
              color={theme.COLORS.WHITE}
              size={50}
              weight="fill"
            />
          }
        />

        <DashboardButton 
          title="4 Salas com limpeza pendente"
          icon={
            <ClockCountdownIcon 
              color={theme.COLORS.WHITE}
              size={50}
              weight="fill"
            />
          }
        />

      </ContainerButton>
      </Main>
    </Container>
  )
}