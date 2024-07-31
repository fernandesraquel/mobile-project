import React, { useEffect } from 'react';
import { 
  Text, 
  View,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  Feather as Icon, 
  MaterialIcons as MIcon, 
  MaterialCommunityIcons as MCIcons 
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import PLight from '../../assets/fonts/Poppins/PoppinsLight.ttf';
import PRegular from '../../assets/fonts/Poppins/PoppinsRegular.ttf';
import PBold from '../../assets/fonts/Poppins/PoppinsBold.ttf';
import PExtraBold from '../../assets/fonts/Poppins/PoppinsExtraBold.ttf';

import Chats from '../screens/App/Chats';
import Notifications from '../screens/App/Notifications';
import Schedules from '../screens/App/Schedules';
import Feed from '../screens/App/Feed';

import dataBase from '../data/users';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const getUserProfileImage = () => {
    
    const loggedInUser = dataBase[0]; 
    return loggedInUser?.userImage || 'defaultImageUrl';
  };

  const userProfileImage = getUserProfileImage();

  const [loaded] = useFonts({
    PLight,
    PRegular,
    PBold,
    PExtraBold,
  });

  if (!loaded) {
    return (
      <View></View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#3c40c6',
        tabBarInactiveTintColor: '#aeb0d4',
        tabBarStyle: {
          height: 50,
        },
        headerStyle: { backgroundColor: '#3c40c6' },
          headerTitleStyle: {
            marginLeft: 2,
            fontSize: 20,
            color: '#fff',
            fontFamily: 'PRegular',
          },
          headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          title: '',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: userProfileImage }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
        ),
        headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}}
              onPress={() => alert('Esta funcionalidade ainda não foi implementada')}
            >
              <MCIcons name='calendar' color='#fff' size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Schedules"
        component={Schedules}
        options={{
          title: 'Agendamentos',
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          title: 'Conversas',
          tabBarLabel: 'Conversas',
          tabBarIcon: ({ color, size }) => (
            <Icon name='message-circle' color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 4}}
              onPress={() => alert('Esta funcionalidade ainda não foi implementada')}
            >
              <MCIcons name='dots-vertical' color='#fff' size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppTabs;

