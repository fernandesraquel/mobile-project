import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, FlatList, View as RNView } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons as MCIcons, MaterialIcons as MIcons } from '@expo/vector-icons';
import { getUserById } from '../../data/database';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [profile, setProfile] = useState(user);

  // Atualiza os dados do usuário quando o perfil muda
  useEffect(() => {
    if (user?.id) {
      getUserById(user.id, (data) => {
        setProfile(data);
      });
    }
  }, [user]);

  // Atualiza o cabeçalho da navegação
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Perfil</Text>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation, user]);

  const isStudent = profile?.user_type === 'Estudante';
  const menuOptions = [
    { id: '1', title: 'Atualizar Cadastro', icon: 'account-edit-outline', action: () => navigation.navigate('EditProfile', { userId: profile.id })},
    ...(isStudent ? [] : [
      { id: '2', title: 'Cadastrar Turnos', icon: 'earth-plus', action: () => navigation.navigate('CreateShift') },
      { id: '3', title: 'Cadastrar Horários', icon: 'clock-plus-outline', action: () => navigation.navigate('CreateShiftTimes') },
      { id: '4', title: 'Enviar Notificação', icon: 'bell-plus-outline', action: () => navigation.navigate('NotificationForm') },
    ]),
    { id: '5', title: 'Configurações', icon: 'cog-outline', action: () => navigation.navigate('Settings') },
    { id: '6', title: 'Sair', icon: 'exit-to-app', action: logout },
  ];

  const renderMenuItem = ({ item, index }) => (
    <View>
      <TouchableOpacity style={styles.menuItem} onPress={item.action}>
        <MCIcons name={item.icon} size={24} color="#222" style={styles.menuIcon} />
        <Text style={styles.menuText}>{item.title}</Text>
      </TouchableOpacity>
      {index === menuOptions.findIndex(option => option.title === 'Configurações') && (
        <View style={styles.separator} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile?.profile_image }} style={styles.profileImage} />
        {isStudent ? (
          <>
            <Text style={styles.userName}>{profile?.name} | {profile?.institution}</Text>
          </>
        ) : (
          <>
            <Text style={styles.userName}>{profile?.name} | Motorista</Text>
            <Text style={styles.userInstitution}>{profile?.institution}</Text>
          </>
        )}
        <Text style={styles.userEmail}>{profile?.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        <FlatList
          data={menuOptions}
          keyExtractor={(item) => item.id}
          renderItem={renderMenuItem}
          ItemSeparatorComponent={() => null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
  profileHeader: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userInstitution: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'PBold',
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
});

export default Profile;

