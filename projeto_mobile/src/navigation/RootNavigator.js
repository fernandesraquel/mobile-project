import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="AppTabs" 
          component={AppTabs} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="AppStack" 
          component={AppStack} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;