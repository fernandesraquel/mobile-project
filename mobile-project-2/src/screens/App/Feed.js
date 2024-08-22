import { useContext } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const Feed = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Feed;
