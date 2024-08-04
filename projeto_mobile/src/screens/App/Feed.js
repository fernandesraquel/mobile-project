import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

// Dados dos serviços
const options = [
  { id: '1', title: 'Atualização Cadastral', icon: 'account-edit', view: 'Registration' },
  { id: '2', title: 'Configurações', icon: 'cogs', view: 'Settings' },
];

const Feed = () => {
  const showAlert = (view) => {
    Alert.alert('Serviço Selecionado', `Você selecionou o serviço: ${view}`);
  };

  return (
    <View style={styles.container}>

      {/* Mapa com Instituições */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Rotas do Dia</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -6.4531,
            longitude: -37.1004,
            latitudeDelta: 0.064,
            longitudeDelta: 0.05,
          }}
        />
      </View>

      {/* Lista de Serviços */}
      <View style={styles.content}>
        <Text style={styles.header}>Outros Serviços</Text>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={options}
          horizontal={true}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => showAlert(item.view)}
            >
              <View style={styles.cardContent}>
                <MCIcons name={item.icon} size={50} color="#3c40c6" />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
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
  mapContainer: {
    height: 450,
    marginVertical: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c40c6',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c40c6',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  list: {
    backgroundColor: '#fafafa',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 10,
    backgroundColor: '#fff',
    width: 170,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 8,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#3c40c6',
    marginTop: 8,
  },
});

export default Feed;
