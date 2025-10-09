import CircularProgress from "react-native-circular-progress-indicator";
import { useTheme } from "styled-components/native";

type Props = {
  value: number;
}

export function ProgressCircle({ value }: Props ){
  const { COLORS, FONT_FAMILY } = useTheme();

  return (
    <CircularProgress 
      value={value}
      radius={30}
      activeStrokeColor={COLORS.ACCENT}
      inActiveStrokeColor={COLORS.ACCENT_LIGHT}
      progressValueColor={COLORS.PRIMARY}
      valueSuffix={"%"}
      progressValueStyle={{ fontFamily: FONT_FAMILY.BOLD}}
    />
  )
}