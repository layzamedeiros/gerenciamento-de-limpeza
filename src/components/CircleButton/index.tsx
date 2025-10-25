import { FC } from "react";
import { Container } from "./styles";
import { IconProps } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

type Props = {
  Icon: FC<IconProps>;
  iconSize: number;
  colorIcon: string;
}

export function CircleButton({ Icon, iconSize, colorIcon }: Props) {
  const theme = useTheme();

  return (
    <Container 
      style={({pressed}) => [
        { backgroundColor: pressed ? theme.COLORS.ACCENT_PRESSING : theme.COLORS.ACCENT }
      ]}
    >
      <Icon 
        size={iconSize}
        color={colorIcon}
      />
    </Container>
  );  
}
