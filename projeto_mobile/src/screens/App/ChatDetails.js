import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  Alert, 
  FlatList, 
  TextInput, 
  StyleSheet 
} from 'react-native';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

const ChatDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [messages, setMessages] = useState(user.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              name='chevron-left'
              size={30}
              color='#3c40c6'
            />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: user.userImage }}
          />
          <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
            <Text style={{ color: '#222', fontWeight: '700', fontSize: 18 }}>
              {user.userName}
            </Text>
            <Text style={{ color: '#222', fontWeight: '300' }}>
              {user.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            Alert.alert('Audio Call', 'Audio Call Button Pressed');
          }}
        >
          <Icon name='phone' size={24} color='#222' />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'Você',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        seenByUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage('');
    }
  };

  const handleSendImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMessageObject = {
        id: messages.length + 1,
        image: result.assets[0].uri,
        sender: 'Você',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        seenByUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    }
  };

  const handleStartRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handleStopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const newMessageObject = {
      id: messages.length + 1,
      audio: uri,
      sender: 'Você',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      seenByUser: false,
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'Você' ? styles.myMessage : styles.theirMessage]}>
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
      {item.audio && (
        <TouchableOpacity onPress={() => handlePlayAudio(item.audio)}>
          <Icon name="play-circle" size={24} color="#222" />
        </TouchableOpacity>
      )}
      <View style={styles.messageDetails}>
        <Text style={styles.messageTime}>{item.time}</Text>
        {item.sender === 'Você' && (
          <MIcon 
            name={item.seenByUser ? 'done-all' : 'done'} 
            size={16} 
            color={item.seenByUser ? '#3c40c6' : '#222'} 
          />
        )}
      </View>
    </View>
  );

  const handlePlayAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite uma mensagem..."
          placeholderTextColor='#6C6C70'
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
            <Icon name="send" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSendImage}>
            <Icon name="camera" size={24} color="#222" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconButtonAudio}
          onPressIn={handleStartRecording}
          onPressOut={handleStopRecording}
        >
          <Icon name="mic" size={24} color="#222" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  messageDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#555',
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 22,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  iconButtonAudio: {
    marginLeft: 10,
  },
});

export default ChatDetails;
