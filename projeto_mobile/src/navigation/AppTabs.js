import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Feather as Icon, MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import PBold from '../../assets/fonts/Poppins/PoppinsBold.ttf';
import moment from 'moment';
import 'moment/locale/pt-br';  // Importa a configuração local para o português
import { Calendar } from 'react-native-calendars';

// Importação das telas da aplicação
import Chats from '../screens/App/Chats';
import Notifications from '../screens/App/Notifications';
import Clocks from '../screens/App/Clocks';
import Feed from '../screens/App/Feed';

// Importação do componente customizado
import CustomerTabBar from '../components/CustomerTabBar';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const [loaded] = useFonts({
    PBold,
  });
  const navigation = useNavigation();
  const [currentUser] = useState({
    profile_image: 'https://raw.githubusercontent.com/fernandesraquel/tuniapp/main/src/assets/images/userPhoto.jpg',
  });

  const [modalVisible, setModalVisible] = useState(false);

  moment.locale('pt-br');  // Define o idioma globalmente

  const currentDate = moment().format('DD[,] MMMM');

  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator 
        tabBar={(props) => <CustomerTabBar {...props} />}
      >
        <Tab.Screen 
          name="Feed" 
          component={Feed} 
          options={{
            title: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#fafafa' },
            headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.headerLeft}
                onPress={() => navigation.navigate('AppStack', {screen: 'ProfileDetails'})}
              >
                <Image 
                  source={{ uri: currentUser.profile_image }} 
                  style={styles.profileImage} 
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.calendarContainer}
                onPress={() => setModalVisible(true)}
              >
                <MCIcons name='calendar' color='#222' size={26} />
                <Text style={styles.currentDateText}>{currentDate}</Text>
              </TouchableOpacity>
            ),
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Clocks" 
          component={Clocks} 
          options={{
            title: 'Horários',
            tabBarLabel: 'Horários',
            tabBarIcon: ({ color, size }) => (
              <Icon name='clock' color={color} size={size} />
            ),
            headerRight: () => (
              <TouchableOpacity style={{marginRight: 8}}
                onPress={() => navigation.navigate('SearchChats')}
              >
                <MCIcons name='dots-vertical' color='#222' size={24} />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              fontSize: 22,
              color: '#3c40c6',
              fontFamily: 'PBold',
            },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#fafafa' },
          }} 
        />
        <Tab.Screen 
          name="Notifications" 
          component={Notifications} 
          options={{
            title: 'Notificações',
            tabBarLabel: 'Notificações',
            tabBarIcon: ({ color, size }) => (
              <Icon name='bell' color={color} size={size} />
            ),
            headerRight: () => (
              <TouchableOpacity style={{marginRight: 8}}
                onPress={() => navigation.navigate('SearchChats')}
              >
                <MCIcons name='dots-vertical' color='#222' size={24} />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              fontSize: 22,
              color: '#3c40c6',
              fontFamily: 'PBold',
            },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#fafafa' },
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
              <TouchableOpacity style={{marginRight: 8}}
                onPress={() => navigation.navigate('SearchChats')}
              >
                <MCIcons name='dots-vertical' color='#222' size={24} />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              fontSize: 22,
              color: '#3c40c6',
              fontFamily: 'PBold',
            },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#fafafa' },
          }} 
        />
      </Tab.Navigator>

      {/* Modal do Calendário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar
              current={moment().format('YYYY-MM-DD')}
              markedDates={{
                [moment().format('YYYY-MM-DD')]: { selected: true, marked: true }
              }}
              style={styles.calendar}
              theme={{
                textDayFontFamily: 'Poppins',
                textMonthFontFamily: 'Poppins',
                textDayHeaderFontFamily: 'Poppins',
                textDayFontSize: 16,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 14,
                monthTextColor: '#222',
                indicatorColor: '#3c40c6',
                selectedDayBackgroundColor: '#3c40c6',
                selectedDayTextColor: '#fff',
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  calendarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 8,
  },
  currentDateText: {
    fontSize: 13,
    color: '#222',
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  calendar: {
    width: '100%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3c40c6',
    borderRadius: 22,
    width: '80%',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppTabs;
