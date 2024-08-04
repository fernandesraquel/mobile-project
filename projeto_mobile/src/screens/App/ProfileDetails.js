import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import PBold from '../../../assets/fonts/Poppins/PoppinsBold.ttf';
import { FontAwesome as FAIcons, MaterialCommunityIcons as MCI } from '@expo/vector-icons';

const ProfileDetails = () => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    PBold,
  });

  const [user] = useState({
    profile_image: 'https://raw.githubusercontent.com/fernandesraquel/tuniapp/main/src/assets/images/userPhoto.jpg',
    name: 'Raquel Lima',
    email: 'raquel.lima@example.com',
    institution: 'UFRN',
  });

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
            <MCI name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Perfil</Text>
        </View>
      ),
    });
  }, [navigation]);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.profile_image }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userInstitution}>{user.institution}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <MCI name='account-edit' size={20} color='#222' />
        <Text style={styles.editButtonText}>Atualização Cadastral</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Conversations')}
      >
        <FAIcons name='comments' size={20} color='#222' />
        <Text style={styles.editButtonText}>Minhas Conversas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Appointments')}
      >
        <FAIcons name='calendar' size={20} color='#222' />
        <Text style={styles.editButtonText}>Meus Agendamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <MCI name='cogs' size={20} color='#222' />
        <Text style={styles.editButtonText}>Configurações</Text>
      </TouchableOpacity>

      {/* Linha superior para separar o botão de logout */}
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          // Adicione aqui a lógica de logout real
          console.log('Logout');
        }}
      >
        <FAIcons name='sign-out' size={20} color='#222' />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
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
  profileHeader: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'PBold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userInstitution: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: '#222',
    fontSize: 18,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 8,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#222',
    fontSize: 18,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});

export default ProfileDetails;


