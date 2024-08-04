import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import dataBase from '../../data/users'; 
import { Feather as Icon, MaterialIcons as MIcon, FontAwesome as FAIcon } from '@expo/vector-icons';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('Todas'); 

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);

    if (Array.isArray(dataBase)) {
      const allNotifications = dataBase.flatMap(user => 
        (user.notifications || []).map(notification => ({ 
          ...notification, 
          userImage: user.userImage, 
          userName: user.userName,
          seenByUser: user.message.seenByUser,
        }))
      );
      setNotifications(allNotifications);
    }
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'Todas') {
      return true;
    }
    if (filter === 'Não lidas') {
      return !notification.seenByUser;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Todas' && styles.activeFilterButton]}
          onPress={() => setFilter('Todas')}
        >
          <Text style={[styles.filterText, filter === 'Todas' && styles.activeFilterText]}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Não lidas' && styles.activeFilterButton]}
          onPress={() => setFilter('Não lidas')}
        >
          <Text style={[styles.filterText, filter === 'Não lidas' && styles.activeFilterText]}>Não lidas</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {filteredNotifications.length === 0 ? (
            <Text style={styles.noNotificationsText}>Nenhuma notificação</Text>
          ) : (
            filteredNotifications.map(notification => (
              <View key={notification.id} style={styles.notificationCard}>
                <View style={styles.notificationHeader}>
                  <Image source={{ uri: notification.userImage }} style={styles.userImage} />
                  <View style={styles.notificationTextContainer}>
                    <View style={styles.direction}>
                      <Text style={styles.userName}>{notification.userName}</Text>
                      <Text style={styles.notificationTime}>{notification.timestamp}</Text>
                    </View>
                    <Text style={styles.notificationText}>{notification.text}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#DFDEF1',
  },
  activeFilterButton: {
    backgroundColor: '#DFDEF1',
  },
  filterText: {
    fontSize: 16,
  },
  activeFilterText: {
    color: '#3c40c6',
    fontWeight: '600'
  },
  notificationCard: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  direction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
  },
  notificationText: {
    color: '#6C6C70',
    fontSize: 16,
  },
  notificationTime: {
    color: '#6C6C70',
    fontSize: 14,
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#6C6C70',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Notifications;
