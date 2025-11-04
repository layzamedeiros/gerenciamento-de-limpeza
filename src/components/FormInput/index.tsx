import { TextInputProps } from "react-native";
import { Container, ErrorText, Input, InputName } from "./styles";

type Props = TextInputProps & {
  inputName?: string;
  errorMessage?: string;
  flex?: number
}

export function FormInput({ inputName, flex = 0, errorMessage,...rest }: Props) {
  const isInvalid = !!errorMessage;

  return (
    <Container flex={flex}>
      { !!inputName &&
        <InputName>{inputName}</InputName>
      }

      <Input 
        error={isInvalid}
        {...rest}
      />
      
      { isInvalid && <ErrorText>{errorMessage}</ErrorText> }
    </Container>
  );
}