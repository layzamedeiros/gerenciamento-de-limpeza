import { TouchableOpacityProps } from "react-native";
import { ArrowDown, ArrowUp, Container, DropdownContainer, DropdownItemContainer, ListContainer, TextDropdown, TextDropdownPlaceholder } from "./styles";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";

// Container externo para abrigar todos, um fixo em cima, e abaixo dele uma flatlist que vai renderizar uma lista das opcoes com base no array de items que receber

type Props = TouchableOpacityProps & {
  content: string[];
  pressed: boolean;
}

export function Dropdown({ content, pressed, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <DropdownContainer pressed={pressed} {...rest}>
        <TextDropdownPlaceholder>Selecionar zeladores</TextDropdownPlaceholder>

        { pressed ?
            <ArrowUp />
          :
            <ArrowDown />
        }
      </DropdownContainer>

      { pressed &&
          <ListContainer
            data={content}
            keyExtractor={item => item as string}
            renderItem={({ item , index }) => (
              <DropdownItemContainer index={index} lenght={content.length}>
                <TextDropdown>{item}</TextDropdown>
              </DropdownItemContainer>
            )}
            showsVerticalScrollIndicator={false}
          />
      }
    </Container>
  );
}
