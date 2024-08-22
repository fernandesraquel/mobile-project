import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { 
  createShiftsTable, 
  createShiftTimesTable, 
  insertShiftTime, 
  fetchShifts, 
  fetchShiftTimes 
} from '../../data/database';

const CreateShiftTimes = ({ navigation }) => {

  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [departureTime, setDepartureTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [shiftTimes, setShiftTimes] = useState([]);
  const [selectedType, setSelectedType] = useState('departure');

  useEffect(() => {   
    loadShifts();
    createShiftsTable();
    createShiftTimesTable();

    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{'Cadastro de Horários'}</Text>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);

  }, [navigation]);

  const loadShifts = () => {
    fetchShifts((result) => {
      setShifts(result);
      if (result.length > 0) {
        setSelectedShift(result[0].id); // Seleciona o primeiro turno por padrão
        loadShiftTimes(result[0].id); // Carrega os horários do turno selecionado
      }
    });
  }; 

  const loadShiftTimes = (shiftId) => {
    fetchShiftTimes(shiftId, (result) => {
      setShiftTimes(result);
    });
  };

  const handleAddTime = () => {
    if (selectedType === 'departure' && departureTime.trim() === '') {
      Alert.alert('Validação', 'Por favor, insira um horário de ida válido.');
      return;
    }

    if (selectedType === 'return' && returnTime.trim() === '') {
      Alert.alert('Validação', 'Por favor, insira um horário de volta válido.');
      return;
    }

    const time = {
      shift_id: selectedShift,
      departure_time: selectedType === 'departure' ? departureTime : null,
      return_time: selectedType === 'return' ? returnTime : null,
    };

    insertShiftTime(time, (error) => {
      if (error) {
        Alert.alert('Erro', 'Erro ao inserir o horário.');
        return;
      }

      Alert.alert('Sucesso', 'Horário cadastrado com sucesso!');
      loadShiftTimes(selectedShift);
      setDepartureTime('');
      setReturnTime('');
    });
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        selectedValue={selectedShift}
        onValueChange={(itemValue) => {
          setSelectedShift(itemValue);
          loadShiftTimes(itemValue);
        }}
        placeholder={{
          label: 'Selecione o Turno',
          value: null,
        }}
        items={shifts.map((shift) => ({
          label: shift.name,
          value: shift.id,
        }))}
      />

      <RNPickerSelect
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        placeholder={{
          label: 'Tipo de Horário',
          value: null,
        }}
        items={[
          { label: 'Ida', value: 'departure' },
          { label: 'Volta', value: 'return' },
        ]}
      />

      {selectedType === 'departure' ? (
        <TextInput
          style={styles.input}
          value={departureTime}
          onChangeText={setDepartureTime}
          placeholder="Digite o horário de ida (HH:MM)"
          placeholderTextColor="#888B8D"
        />
      ) : (
        <TextInput
          style={styles.input}
          value={returnTime}
          onChangeText={setReturnTime}
          placeholder="Digite o horário de volta (HH:MM)"
          placeholderTextColor="#888B8D"
        />
      )}

      <TouchableOpacity style={styles.loginButton} onPress={handleAddTime}>
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

export default CreateShiftTimes;
