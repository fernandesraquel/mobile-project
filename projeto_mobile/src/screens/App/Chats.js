import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
  StatusBar,
  TextInput
} from 'react-native';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import usersData from '../../data/users';

const Chats = () => {
  const [messages, setMessages] = useState(usersData);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredMessages = messages.filter((chat) =>
    chat.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <View
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          placeholderTextColor='#555'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Icon name="search" size={20} color='#aeb0d4' />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredMessages.map((chat) => (
          <TouchableOpacity
            key={chat.userName}
            style={styles.cardMessages}
            onLongPress={() => {
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
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const chatMessages = messages.filter(
                  (message) => message.userName === chat.userName
                );
                if (chatMessages.length > 0) {
                  setCurrentMessages(chatMessages);
                  setMessageModalVisible(true);
                }
              }}
            >
              <Image
                style={styles.imageUser}
                source={{ uri: chat.userImage}}
              />
            </TouchableOpacity>
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
                  chat.message.seenByUser ? (
                    <MIcon name='done-all' size={16} color='#3c40c6' />
                  ) : (
                    <MIcon name='done' size={16} color={'#555'} />
                  )
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={true}
        visible={messageModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setMessageModalVisible(false)}
            >
              <Icon name='x' color='#fafafa' size={26} />
            </TouchableOpacity>
            <Swiper
              showsButtons={true}
              style={styles.swiper}
              loop={false}
              showsPagination={false}
            >
              {currentMessages.map((message) => (
                <View key={message.userName} style={styles.swiperSlide}>
                  <View style={styles.messagesUser}>
                    <Image
                      style={styles.storyUserImage}
                      source={{ uri: message.userImage}}
                    />
                    <Text style={styles.storyUserName}>{message.userName}</Text>
                  </View>
                  <Text style={styles.storyMessageText}>{message.message.text}</Text>
                </View>
              ))}
            </Swiper>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#aeb0d4',
    color: '#aeb0d4',
    marginRight: 5,
  },
  cardMessages: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4ea',
  },
  imageUser: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  messageDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  time: {
    fontSize: 14,
    color: '#676767',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typingText: {
    color: '#3c40c6',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#676767',
  },
  bottomSpacer: {
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1f2a36',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
    borderRadius: 100,
    padding: 2,
  },
  swiper: {
    height: '100%',
  },
  swiperSlide: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  messagesUser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  storyUserName: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyMessageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chats;
