import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomApp } from './bottomApp.routes'; 
import { ClassRoom } from '@screens/ClassRoom';  

export type AppRoutesParamList = {
  MainTabs: undefined; 
  ClassRoom: undefined; 
};

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="MainTabs" 
        component={BottomApp} 
      />
      
      <Screen 
        name="ClassRoom" 
        component={ClassRoom} 
      />
    </Navigator>
  );
}