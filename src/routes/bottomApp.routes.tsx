import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HouseIcon, ChalkboardIcon, PlusSquareIcon, UserCircleIcon, UsersThreeIcon } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { TouchableOpacity } from "react-native";
import { ClassRoom } from "@screens/ClassRoom";
import { RecordCleaning } from "@screens/RecordCleaning";
import { Account } from "@screens/Account";
import { UserType } from '../../App';
import { ManageEmployee } from "@screens/ManageEmployee";

export type BottomTabParamList = {
  Home: undefined; 
  ClassRoom: undefined;
  ManageEmployee: undefined;
  RecordCleaning: undefined;
  Account: undefined;
};

type BottomAppProps = {
  userType: UserType;
}

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export function BottomApp({ userType }: BottomAppProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Navigator
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarButton: (props: any) => (
          <TouchableOpacity 
            {...props} 
            activeOpacity={1} 
            style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
          />),
        tabBarStyle: {
          backgroundColor: theme.COLORS.PRIMARY,
          borderTopWidth: 0,
          height: 60 + insets.bottom,
        },
        tabBarActiveTintColor: theme.COLORS.WHITE,    
        tabBarInactiveTintColor: theme.COLORS.DISABLED, 
      }}
    >
      <Screen 
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <HouseIcon
              weight={focused ? 'fill' : 'regular'}
              size={26} 
              color={color} 
            />
          )
        }}
      />

      <Screen 
        name="ClassRoom"
        component={ClassRoom}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ChalkboardIcon 
              weight={focused ? 'fill' : 'regular'}
              size={26} 
              color={color} 
            />
          )
        }}
      />

       {userType === 'admin' ? (
        <Screen 
          name="ManageEmployee"
          component={ManageEmployee}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <UsersThreeIcon 
                weight={focused ? 'fill' : 'regular'} 
                size={26} 
                color={color} 
              />
            )
          }}
        />
      ) : (
        <Screen 
          name="RecordCleaning"
          component={RecordCleaning}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <PlusSquareIcon 
                weight={focused ? 'fill' : 'regular'} 
                size={26} 
                color={color} 
              />
            )
          }}
        />
      )}
      

      <Screen 
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <UserCircleIcon 
              weight={focused ? 'fill' : 'regular'} 
              size={26} 
              color={color} 
            />
          )
        }}
      />
    </Navigator>
  )
}