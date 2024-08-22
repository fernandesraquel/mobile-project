import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { verifyUserCredentials } from '../../data/database';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const navigateToRegister = () => {
    navigation.navigate('UserTypeSelection');
  };

  const navigateToForgot = () => {
    navigation.navigate('ForgotPassword');
  };

  const navigateToHome = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    verifyUserCredentials(
      email,
      password,
      (user) => {
        login(user);
        navigation.navigate('App', { screen: 'Feed' });
      },
      (error) => {
        Alert.alert('Erro de Login', error);
      }
    );
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGradient}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888B8D"
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#888B8D"
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
              color="#888B8D"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={navigateToForgot}>
          <Text style={styles.fpText}>{'Esqueci minha senha?'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={navigateToHome}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}>{'Não tem uma conta?'}</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={[styles.signUpText, { color: '#3c40c6' }]}>
              {' Cadastre-se'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containerGradient: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  input: {
    width: '100%',
    height: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
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
    paddingVertical: 12,
    fontSize: 16,
    color: '#888B8D',
  },
  eyeIcon: {
    padding: 10,
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#3c40c6',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
    paddingVertical: 12,
  },
  loginButton: {
    backgroundColor: '#3c40c6',
    paddingVertical: 12,
    borderRadius: 22,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    alignSelf: 'center',
  },
  signUpTextView: {
    marginTop: 10,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#888B8D',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Login;

