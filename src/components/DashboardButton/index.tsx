import { TouchableOpacityProps } from "react-native";
import { Button, Content, Title, SubTitle, IconWrapper } from "./styles";
import React, { ReactNode } from "react";
import { ProgressCircle } from "@components/ProgressCircle";

type Props = TouchableOpacityProps & {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  progress?: number;
};

export function DashboardButton({ title, subtitle, icon, progress, onPress }: Props) {
  return (
     <Button onPress={onPress}>
      <Content>
        {progress !== undefined ? (
          <ProgressCircle value={progress} />
        ) : (
          icon && <IconWrapper>{icon}</IconWrapper>
        )}
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </Content>
    </Button>
  );
}