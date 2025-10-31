import { TouchableOpacityProps } from "react-native";
import { ArrowDown, ArrowUp, Container, DropdownContainer, DropdownItemContainer, DropdownText, ListContainer, TextDropdown, TextDropdownPlaceholder } from "./styles";

type Props = TouchableOpacityProps & {
  dropdownText?: string
  content: string[];
  pressed: boolean;
  errorMessage?: string;
  value?: string[];
  onChange: (newValue: string[]) => void;
}

export function Dropdown({ dropdownText, content, pressed, errorMessage, value = [], onChange, ...rest }: Props) {
  const isInvalid = !!errorMessage;

  function handleSelectItem(item: string) {
    const isSelected = value.includes(item);
    let newSelected: string[];

    if (isSelected) {
      newSelected = value.filter(selectedItem => selectedItem !== item);
    } else {
      newSelected = [...value, item];
    }

    onChange(newSelected);
  }  

  const displayText = value.length > 0 ? value.join(', ') : "Selecionar zeladores";

  return (
    <Container>
      { dropdownText && <DropdownText>{dropdownText}</DropdownText>}

      <DropdownContainer isInvalid={isInvalid} pressed={pressed} {...rest}>
        <TextDropdownPlaceholder>{displayText}</TextDropdownPlaceholder>

        { pressed ? <ArrowUp /> : <ArrowDown /> }
      </DropdownContainer>

      { pressed &&
          <ListContainer
            style={{ zIndex: 100 }} 
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {content.map((item, index) => {
              const isItemSelected = value.includes(item);

              return (
                <DropdownItemContainer 
                  key={item}
                  index={index} 
                  lenght={content.length}
                  onPress={() => handleSelectItem(item)} 
                  style={{ backgroundColor: isItemSelected ? '#e0e0e0' : 'transparent' }} 
                >
                  <TextDropdown>{item}</TextDropdown>
                </DropdownItemContainer>
              );
            })}

          </ListContainer>
      }
    </Container>
  );
}
