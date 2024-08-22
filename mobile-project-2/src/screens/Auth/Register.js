import { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons as MCIcons, Ionicons } from '@expo/vector-icons';
import db, { createTable, insertUser } from '../../data/database';

const Register = ({ route }) => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState(route.params?.userType || 'Estudante');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    createTable();

    navigation.setOptions({
      title: `${userType}`,
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation, userType]);

  const pickImage = async () => {
    // Solicita permissão para acessar a biblioteca de imagens
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Permissão para acessar a biblioteca de imagens é necessária.");
      return;
    }

    // Permite ao usuário escolher uma imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Aspecto quadrado
      quality: 1,
    });

    // Define a URI da imagem escolhida
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    // Verifica se todos os campos necessários estão preenchidos
    if (!name || !email || !password || (userType === 'Estudante' && !institution) || (userType === 'Motorista' && !institution)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos necessários.');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      user_type: userType,
      institution: institution,
      profile_image: profileImage,
    };

    // Adiciona o usuário ao banco de dados
    insertUser(newUser); 

    // Exibe uma confirmação com os dados inseridos
    Alert.alert(
      'Confirmar Dados',
      `Nome: ${name}\nEmail: ${email}\n${
        userType === 'Estudante' ? `Instituição: ${institution}` : `Empresa/Prefeitura: ${institution}`
      }`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]
    );
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
      {(userType === 'Estudante' || userType === 'Motorista') && (
        <TextInput
          placeholder={userType === 'Estudante' ? 'Instituição' : 'Empresa/Prefeitura'}
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
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#888B8D',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#888B8D',
  },
  eyeIcon: {
    padding: 10,
  },
  imagePickerButton: {
    backgroundColor: '#F0F0F0',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingTop: 70,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#3c40c6',
    borderRadius: 25,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;

