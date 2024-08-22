import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Splash, 
  Login, 
  UserTypeSelection, 
  Register,
} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: '#fafafa' },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#3c40c6'
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerBackVisible: false
        }}
      />
      <Stack.Screen 
        name="UserTypeSelection" 
        component={UserTypeSelection} 
        options={{
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
        name="Register" 
        component={Register} 
        options={{
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

export default AuthStack;