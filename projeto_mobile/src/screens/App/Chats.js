import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Alert, 
  StyleSheet 
} from 'react-native';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import usersData from '../../data/users';

const Chats = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(usersData);

  const handleLongPress = (chat) => {
    Alert.alert(
      'Apagar conversa',
      `Deseja apagar a conversa com ${chat.userName}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Apagar',
          onPress: () => {
            const newChats = messages.filter(
              (m) => m.userName !== chat.userName
            );
            setMessages(newChats);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={() => navigation.navigate('AppStack', { screen: 'SearchChats' })}
      >
        <Icon name="search" size={22} color='#6C6C70' />
        <Text style={styles.searchButtonText}>Pesquisar...</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {messages.map((chat) => (
          <TouchableOpacity
            key={chat.userName}
            style={styles.cardMessages}
            onPress={() => navigation.navigate('AppStack', { screen: 'ChatDetails', params: { user: chat } })}
            onLongPress={() => handleLongPress(chat)}
          >
            <Image
              style={styles.imageUser}
              source={{ uri: chat.userImage }}
            />
            <View style={styles.messageDetails}>
              <View style={styles.header}>
                <Text style={styles.userName}>{chat.userName}</Text>
                <Text style={styles.time}>{chat.time}</Text>
              </View>

              <View style={styles.messageContainer}>
                {chat.isTyping ? (
                  <Text style={styles.typingText}>digitando...</Text>
                ) : (
                  <Text style={styles.messageText}>{chat.message.text}</Text>
                )}
                {chat.message.sender === 'Você' && (
                  <View style={styles.seenStatus}>
                    {chat.message.seenByUser ? (
                      <MIcon name='done-all' size={16} color='#3c40c6' />
                    ) : (
                      <MIcon name='done' size={16} color={'#222'} />
                    )}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 14,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    marginTop: 5
  },
  searchButtonText: {
    marginLeft: 10,
    color: '#6C6C70',
    fontSize: 16
  },
  cardMessages: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14
  },
  imageUser: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageDetails: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18
  },
  time: {
    color: '#6C6C70',
    fontSize: 14
  },
  messageText: {
    color: '#6C6C70',
    fontSize: 16
  },
  typingText: {
    color: '#059212',
    fontSize: 16
  },
  bottomSpacer: {
    height: 20,
  },
  seenStatus: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});

export default Chats;
