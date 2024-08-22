import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather as Icon, MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Feed, Clocks} from '../screens';


function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function Chats() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chats!</Text>
    </View>
  );
}

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = {
          Feed: 'home',
          Clocks: 'clock',
          Notifications: 'bell',
          Chats: 'message-circle',
        }[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Icon name={iconName} size={24} color={isFocused ? '#3C40C6' : '#222'} />
            <Text style={{ 
              color: isFocused ? '#3C40C6' : '#222',
              fontWeight: isFocused ? '800' : 'normal',
              marginTop: 4,
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen 
        name="Feed" 
        component={Feed} 
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fafafa' },
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.headerLeft}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image 
                source={{ uri: user?.profile_image }} 
                style={styles.profileImage} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen 
        name="Clocks" 
        component={Clocks} 
        options={{
          tabBarLabel: 'Horários',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fafafa' },
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}}
              onPress={() => navigation.navigate('Schedules')}
            >
              <MCIcons name='dots-vertical' color='#222' size={24} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 22,
            color: '#3c40c6',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{
          tabBarLabel: 'Notificações',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fafafa' },
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}}
              onPress={() => navigation.navigate('SearchChats')}
            >
              <MCIcons name='dots-vertical' color='#222' size={24} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 22,
            color: '#3c40c6',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen 
        name="Chats" 
        component={Chats}
        options={{
          tabBarLabel: 'Conversas',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fafafa' },
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}}
              onPress={() => navigation.navigate('SearchChats')}
            >
              <MCIcons name='dots-vertical' color='#222' size={24} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 22,
            color: '#3c40c6',
            fontWeight: 'bold',
          },
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },
});

export default AppTabs;
