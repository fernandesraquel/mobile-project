import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import dataBase from '../../data/users';
import { Feather as Icon, MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';

const Schedules = ({ navigation }) => {
  const [selectedReservation, setSelectedReservation] = useState({
    ida: null,
    volta: null
  });
  const [reservations, setReservations] = useState([]);

  const studentData = dataBase[0];

  const handleReservation = (type, value) => {
    setSelectedReservation(prevState => ({
      ...prevState,
      [type]: value
    }));
  };

  const confirmReservation = () => {
    if (selectedReservation.ida && selectedReservation.volta) {
      const newReservation = {
        ida: selectedReservation.ida,
        volta: selectedReservation.volta
      };

      setReservations(prevReservations => [...prevReservations, newReservation]);
      Alert.alert('Agendamento Confirmado', `Ida: ${selectedReservation.ida}\nVolta: ${selectedReservation.volta}`);
    } else {
      Alert.alert('Erro', 'Por favor, selecione horários de ida e volta.');
    }
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
            <Icon
              name='chevron-left'
              size={30}
              color='#3c40c6'
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Agendamentos</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 2 }}
          onPress={() => {
            Alert.alert('Audio Call', 'Audio Call Button Pressed');
          }}
        >
          <MCIcons name='dots-vertical' color='#222' size={24} />
        </TouchableOpacity>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>      
      {Object.keys(studentData.shifts).map(shift => (
        <View key={shift} style={styles.shiftContainer}>
          <Text style={styles.shiftTitle}>{shift.charAt(0).toUpperCase() + shift.slice(1)}</Text>
          
          {studentData.shifts[shift].ida.length > 0 && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeTitle}>Horários de Ida:</Text>
              <View style={styles.buttonRow}>
                {studentData.shifts[shift].ida.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.timeButton, selectedReservation.ida === time && styles.selectedTimeButton]}
                    onPress={() => handleReservation('ida', time)}
                  >
                    <Text style={[styles.timeText, selectedReservation.ida === time && styles.selectedTimeText]}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          {studentData.shifts[shift].volta.length > 0 && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeTitle}>Horários de Volta:</Text>
              <View style={styles.buttonRow}>
                {studentData.shifts[shift].volta.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.timeButton, selectedReservation.volta === time && styles.selectedTimeButton]}
                    onPress={() => handleReservation('volta', time)}
                  >
                    <Text style={[styles.timeText, selectedReservation.volta === time && styles.selectedTimeText]}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmReservation}
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa'
  },
  shiftContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 16
  },
  titleHeader: {
    fontWeight: 'bold',
    color: '#3c40c6',
    fontSize: 22
  },
  shiftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  timeContainer: {
    marginBottom: 10
  },
  timeTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 4,
    marginRight: 8, 
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '40%'
  },
  selectedTimeButton: {
    backgroundColor: '#DFDEF1',
    borderColor: '#DFDEF1',
  },
  timeText: {
    fontSize: 16,
    color: '#222'
  },
  selectedTimeText: {
    color: '#3c40c6'
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center'
  },
  confirmButton: {
    backgroundColor: '#3c40c6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    elevation: 3
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Schedules;
