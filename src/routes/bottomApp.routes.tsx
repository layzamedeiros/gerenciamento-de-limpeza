import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HouseIcon, ChalkboardIcon, PlusSquareIcon, UserCircleIcon } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { TouchableOpacity } from "react-native";

type BottomAppProps = {
  home: undefined;
  classRoom: undefined;
  recordCleaning: undefined;
  account: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<BottomAppProps>();

export function BottomApp() {
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
        name="home"
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
        name="classRoom"
        component={Home}
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

      <Screen 
        name="recordCleaning"
        component={Home}
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

      <Screen 
        name="account"
        component={Home}
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