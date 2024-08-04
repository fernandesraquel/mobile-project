import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import SearchChats from '../screens/App/SearchChats';
import ChatDetails from '../screens/App/ChatDetails';
import Schedules from '../screens/App/Schedules';
import ScheduleDetails from '../screens/App/ScheduleDetails';
import ProfileDetails from '../screens/App/ProfileDetails';

const Stack = createNativeStackNavigator();

const AppStack = () => {

  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: '#FAFAFA' },
        headerShadowVisible: false,
        headerTintColor: '#3c40c6',
      }}
    >
      <Stack.Screen name="Feed" component={AppTabs} />
      <Stack.Screen 
        name="SearchChats" 
        component={SearchChats}
      >
      </Stack.Screen>
      <Stack.Screen 
        name="ChatDetails" 
        component={ChatDetails} 
      />
      <Stack.Screen 
        name="Schedules" 
        component={Schedules} 
      />
      <Stack.Screen
        name="ScheduleDetails"
        component={ScheduleDetails}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
