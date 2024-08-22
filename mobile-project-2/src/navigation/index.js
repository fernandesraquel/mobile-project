import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
