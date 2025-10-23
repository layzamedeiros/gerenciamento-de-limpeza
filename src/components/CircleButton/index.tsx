import { FC } from "react";
import { Container } from "./styles";
import { IconProps } from "phosphor-react-native";

type Props = {
  Icon: FC<IconProps>;
  iconSize: number;
}

export function CircleButton({ Icon, iconSize }: Props) {
  return (
    <Container>
      <Icon 
        size={iconSize}
      />
    </Container>
  );  
}
