import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import { createShiftsTable, insertShifts, fetchShifts } from '../../data/database';

const CreateShift = ({ navigation }) => {
  const [shiftName, setShiftName] = useState('');
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    // Cria a tabela de turnos ao iniciar a tela
    createShiftsTable();
    loadShifts();

    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{'Cadastrar Turnos'}</Text>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  // Função para buscar os turnos cadastrados
  const loadShifts = () => {
    fetchShifts((result) => {
      setShifts(result);
    });
  };

  // Função para cadastrar um novo turno
  const handleAddShift = () => {
    if (shiftName.trim() === '') {
      Alert.alert('Validação', 'Por favor, insira um nome de turno.');
      return;
    }

    const shift = { name: shiftName };

    insertShifts(shift, (error) => {
      if (error) {
        Alert.alert('Erro', 'Erro ao inserir o turno.');
        return;
      }

      Alert.alert('Sucesso', 'Turno cadastrado com sucesso!');
      setShiftName('');
      loadShifts();
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={shiftName}
        onChangeText={setShiftName}
        placeholder="Digite o nome do turno"
        placeholderTextColor="#888B8D"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleAddShift}>
        <Text style={styles.loginButtonText}>Salvar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
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
  loginButton: {
    backgroundColor: '#3c40c6',
    paddingVertical: 12,
    borderRadius: 22,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    alignSelf: 'center',
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
});

export default CreateShift;

