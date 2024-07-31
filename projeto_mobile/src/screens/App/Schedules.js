import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import dataBase from '../../data/users'; // Importando o banco de dados

const SchedulesScreen = () => {
  const [selectedReservation, setSelectedReservation] = useState({
    ida: null,
    volta: null
  });

  // Supondo que você está lidando com o primeiro aluno no banco de dados
  const studentData = dataBase[0];

  const handleReservation = (type, value) => {
    setSelectedReservation(prevState => ({
      ...prevState,
      [type]: value
    }));
  };

  const confirmReservation = () => {
    if (selectedReservation.ida && selectedReservation.volta) {
      // todo: fazer a lógica de salvar a reserva
      Alert.alert('Reserva Confirmada', `Ida: ${selectedReservation.ida}\nVolta: ${selectedReservation.volta}`);
    } else {
      Alert.alert('Erro', 'Por favor, selecione horários de ida e volta.');
    }
  };

  return (
    <ScrollView style={styles.container}>      
      {Object.keys(studentData.shifts).map(shift => (
        <View key={shift} style={styles.shiftContainer}>
          <Text style={styles.shiftTitle}>{shift.charAt(0).toUpperCase() + shift.slice(1)}</Text>
          
          {studentData.shifts[shift].ida.length > 0 && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeTitle}>Horários de Ida:</Text>
              {studentData.shifts[shift].ida.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeButton, selectedReservation.ida === time && styles.selectedTimeButton]}
                  onPress={() => handleReservation('ida', time)}
                >
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {studentData.shifts[shift].volta.length > 0 && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeTitle}>Horários de Volta:</Text>
              {studentData.shifts[shift].volta.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeButton, selectedReservation.volta === time && styles.selectedTimeButton]}
                  onPress={() => handleReservation('volta', time)}
                >
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmReservation}
        >
          <Text style={styles.confirmButtonText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  shiftContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2, 
    padding: 10
  },
  shiftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  timeContainer: {
    marginBottom: 10
  },
  timeTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555'
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#aeb0d4',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#aeb0d4'
  },
  timeText: {
    fontSize: 16,
    color: '#06203c'
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'center'
  },
  confirmButton: {
    backgroundColor: '#3c40c6',
    padding: 15,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  }
});

export default SchedulesScreen;
