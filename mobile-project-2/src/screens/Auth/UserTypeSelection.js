import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as MIcons} from '@expo/vector-icons';

const UserTypeSelection = () => {
  const navigation = useNavigation();

  const handleSelection = (userType) => {
    navigation.navigate('Register', { userType });
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{'Selecione um usuário?'}</Text>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGradient} >
        <View style={styles.buttonSelect}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelection('Estudante')}
          >
            <Text style={styles.buttonText}>Estudante</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelection('Motorista')}
          >
            <Text style={styles.buttonText}>Motorista</Text>
          </TouchableOpacity>
                  
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  containerGradient: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    fontWeight: 'bold',
    color: '#3c40c6',
    fontSize: 22,
    marginLeft: 10,
  },
  buttonSelect: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#3c40c6',
    paddingVertical: 12,
    borderRadius: 22,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    alignSelf: 'center',
  },
});

export default UserTypeSelection;