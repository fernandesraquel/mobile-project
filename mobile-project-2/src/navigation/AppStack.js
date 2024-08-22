import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile, EditProfile, CreateShift, CreateShiftTimes, Schedules, NotificationForm } from '../screens';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="AppTabs" 
        component={AppTabs} 
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="CreateShift" 
        component={CreateShift} 
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="CreateShiftTimes" 
        component={CreateShiftTimes} 
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="Schedules" 
        component={Schedules} 
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfile} 
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="NotificationForm" 
        component={NotificationForm} 
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
