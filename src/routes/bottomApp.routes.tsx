import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "@contexts/AuthContext"; 

import { Home } from "@screens/Home";
import { ClassRoom } from "@screens/ClassRoom";
import { RecordCleaning } from "@screens/RecordCleaning";
import { Account } from "@screens/Account";
import { ManageEmployee } from "@screens/ManageEmployee";
import { TabBarItem } from "@components/TabBarItem"; 
import { TouchableOpacity } from "react-native";
import { ReportRoom } from "@screens/ReportRoom";

export type BottomTabParamList = {
  Home: undefined; 
  ClassRoom: undefined;
  ManageEmployee: undefined;
  RecordCleaning: undefined;
  ReportRoom: undefined;
  Account: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export function BottomApp() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const { isAdmin, isZeladoria, isSolicitante } = useAuth();

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
      {isSolicitante ? (
        <>
          <Screen 
            name="ReportRoom"
            component={ReportRoom}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabBarItem name="Reportar Sala" iconName="ReportRoom" focused={focused} color={color} size={size} />
              )
            }}
          />
          <Screen 
            name="Account"
            component={Account}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabBarItem name="Minha Conta" iconName="Account" focused={focused} color={color} size={size} />
              )
            }}
          />
        </>
      ) : (
        <>
          <Screen 
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabBarItem name="Início" iconName="Home" focused={focused} color={color} size={size} />
              )
            }}
          />

          <Screen 
            name="ClassRoom"
            component={ClassRoom}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabBarItem name="Salas" iconName="ClassRoom" focused={focused} color={color} size={size} />
              )
            }}
          />
          
          {isAdmin ? (
            <Screen 
              name="ManageEmployee"
              component={ManageEmployee}
              options={{
                tabBarIcon: ({ color, focused, size }) => (
                  <TabBarItem name="Usuários" iconName="ManageEmployee" focused={focused} color={color} size={size} />
                )
              }}
            />
          ) : isZeladoria ? ( 
            <Screen 
              name="RecordCleaning"
              component={RecordCleaning}
              options={{
                tabBarIcon: ({ color, focused, size }) => (
                  <TabBarItem name="Limpar" iconName="RecordCleaning" focused={focused} color={color} size={size} />
                )
              }}
            />
          ) : null }

          <Screen 
            name="Account"
            component={Account}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabBarItem name="Minha Conta" iconName="Account" focused={focused} color={color} size={size} />
              )
            }}
          />
        </>
      )}
    </Navigator>
  )
}