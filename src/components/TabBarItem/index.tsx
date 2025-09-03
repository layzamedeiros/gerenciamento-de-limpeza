import React from 'react';
import { HouseIcon, ChalkboardIcon, UsersThreeIcon, PlusSquareIcon, UserCircleIcon, BroomIcon } from 'phosphor-react-native';

import { Container, PageName } from './styles';

export type IconName = 'Home' | 'ClassRoom' | 'ManageEmployee' | 'RecordCleaning' | 'Account';

type Props = {
  name: string;
  iconName: IconName;
  focused: boolean;
  color: string;
  size: number;
};

export function TabBarItem({ name, iconName, focused, color, size }: Props) {

  const renderIcon = () => {
    const weight = focused ? 'fill' : 'regular';
    
    switch (iconName) {
      case 'Home':
        return <HouseIcon color={color} size={size} weight={weight} />;
      case 'ClassRoom':
        return <ChalkboardIcon color={color} size={size} weight={weight} />;
      case 'ManageEmployee':
        return <UsersThreeIcon color={color} size={size} weight={weight} />;
      case 'RecordCleaning':
        return <BroomIcon color={color} size={size} weight={weight} />;
      case 'Account':
        return <UserCircleIcon color={color} size={size} weight={weight} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      {renderIcon()}
      <PageName focused={focused} color={color}>
        {name}
      </PageName>
    </Container>
  );
}