import { 
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const Login = () => {
  return(
    <View style={styles.container}>
      <Text>Tela de Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Login;