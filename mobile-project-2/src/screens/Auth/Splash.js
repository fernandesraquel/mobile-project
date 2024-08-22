import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle('ligth-content', true); 

    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);

    return () => clearTimeout(timer);
    
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#141E46', '#3c40c6', '#141E46']}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Animatable.Text style={styles.logoTitle}
          animation='fadeInUp'
          delay={1200}
        >TUNI</Animatable.Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
});

export default Splash;
