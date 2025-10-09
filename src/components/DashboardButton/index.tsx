import { TouchableOpacityProps } from "react-native";
import { Button, Content, Title, SubTitle, IconWrapper, Description } from "./styles";
import React, { ReactNode } from "react";
import { ProgressCircle } from "@components/ProgressCircle";
import { useTheme } from "styled-components/native";

type Props = TouchableOpacityProps & {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  progress?: number;
};

export function DashboardButton({ title, subtitle, icon, progress, onPress }: Props) {
  const theme = useTheme();
  return (
     <Button onPress={onPress} style={{ boxShadow: `0px 0.5px 4px ${theme.COLORS.BLACK_SHADOW}` }}>
      <Content>
        {progress !== undefined ? (
          <ProgressCircle value={progress} />
        ) : (
          icon && <IconWrapper>{icon}</IconWrapper>
        )}
        <Description>
          <Title>{title}</Title>
          {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </Description>
      </Content>
    </Button>
  );
}