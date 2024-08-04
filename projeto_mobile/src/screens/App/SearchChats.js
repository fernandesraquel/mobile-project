import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import usersData from '../../data/users';
import { useNavigation } from '@react-navigation/native';

const SearchChats = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const filteredMessages = usersData.filter((chat) =>
    chat.userName && chat.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Icon name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Icon name="search" size={22} color='#6C6C70' />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar..."
              placeholderTextColor='#6C6C70'
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        </View>
      ),
    });
  }, [navigation, searchText]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((chat) => (
            <TouchableOpacity
              key={chat.userName}
              style={styles.cardMessages}
              onPress={() => navigation.navigate('AppStack', 
              { screen: 'ChatDetails', params: { user: chat } })}
            >
              <Image style={styles.imageUser} source={{ uri: chat.userImage }} />
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
          ))
        ) : (
          <Text style={styles.noResults}>Nenhum resultado encontrado</Text>
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    maxWidth: '82%',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    color: '#6C6C70',
    fontSize: 16,
    marginTop: 20,
  }
});

export default SearchChats;

