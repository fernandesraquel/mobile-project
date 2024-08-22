import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons as MCIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserById, updateUser } from '../../data/database';

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const userId = route.params?.userId;
    if (userId) {
      getUserById(userId, (data) => {
        if (data) {
          setName(data.name || '');
          setEmail(data.email || '');
          setPassword(data.password || '');
          setInstitution(data.institution || '');
          setProfileImage(data.profile_image || null);
          StatusBar.setBarStyle('dark-content', true);
        }
      });
    }
    
  }, [route.params?.userId]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Atualizar Dados</Text>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Permissão para acessar a biblioteca de imagens é necessária.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos necessários.');
      return;
    }

    const updatedUser = {
      name,
      email,
      password,
      user_type: user.user_type, // Preservando o tipo de usuário original
      institution: institution || null,
      profile_image: profileImage,
    };

    updateUser(user.id, updatedUser)
      .then(() => {
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível atualizar os dados. Tente novamente.');
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton} activeOpacity={0.7}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <MCIcons name="camera-plus" size={28} color='#888B8D' />
        )}
      </TouchableOpacity>

      <TextInput
        placeholder='Nome'
        placeholderTextColor='#888B8D'
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {(user.user_type === 'Estudante' || user.user_type === 'Motorista') && (
        <TextInput
          placeholder={user.user_type === 'Estudante' ? 'Instituição' : 'Empresa/Prefeitura'}
          placeholderTextColor='#888B8D'
          style={styles.input}
          value={institution}
          onChangeText={setInstitution}
        />
      )}
      <TextInput
        placeholder='Email'
        placeholderTextColor='#888B8D'
        style={styles.input}
        autoCorrect={false}
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor='#888B8D'
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={22}
            color='#888B8D'
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleHeader: {
    fontWeight: 'bold',
    color: '#3c40c6',
    fontSize: 22,
    marginLeft: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePickerButton: {
    backgroundColor: '#F0F0F0',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    width: '100%',
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3c40c6',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 22,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    alignSelf: 'center',
  },
});

export default EditProfile;
