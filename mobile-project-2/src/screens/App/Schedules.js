import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext'; 
import { fetchShifts, fetchShiftTimes, insertSchedule } from '../../data/database';

const Schedules = () => {
  const { user } = useContext(AuthContext); // Obtém o usuário logado do contexto
  const [shifts, setShifts] = useState([]);
  const [shiftTimes, setShiftTimes] = useState({});
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('Segunda-feira'); // Exemplo, pode ser alterado conforme necessário

  useEffect(() => {
    fetchShiftsData();
  }, []);

  const fetchShiftsData = () => {
    fetchShifts(setShifts);
  };

  const fetchTimesForShift = (shiftId) => {
    fetchShiftTimes(shiftId, (times) => {
      setShiftTimes(prev => ({ ...prev, [shiftId]: times }));
    });
  };

  const handleShiftSelect = (shiftId) => {
    setSelectedShift(shiftId);
    fetchTimesForShift(shiftId);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmSchedule = async () => {
    if (!user || !user.id) {
      Alert.alert('Erro', 'Usuário não está autenticado.');
      return;
    }
    
    if (selectedShift && selectedTime) {
      try {
        await insertSchedule({
          student_id: user.id,
          shift_time_id: selectedTime.id,
          day_of_week: dayOfWeek,
          status: 'Ativo'
        });
        Alert.alert('Agendamento confirmado!');
      } catch (error) {
        console.error('Erro ao confirmar agendamento:', error);
        Alert.alert('Erro ao confirmar agendamento');
      }
    } else {
      Alert.alert('Selecione um turno e um horário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecione um Turno</Text>
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.id === selectedShift && styles.selectedCard]}
            onPress={() => handleShiftSelect(item.id)}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedShift && (
        <View style={styles.timeContainer}>
          <Text style={styles.header}>Horários Disponíveis</Text>
          <FlatList
            data={shiftTimes[selectedShift] || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.timeCard, item.id === selectedTime?.id && styles.selectedTimeCard]}
                onPress={() => handleTimeSelect(item)}
              >
                <Text style={styles.timeText}>Ida: {item.departure_time}</Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={shiftTimes[selectedShift] || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.timeCard, item.id === selectedTime?.id && styles.selectedTimeCard]}
                onPress={() => handleTimeSelect(item)}
              >
                <Text style={styles.timeText}>Volta: {item.return_time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSchedule}>
        <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  selectedCard: {
    backgroundColor: '#a0c8ea'
  },
  cardTitle: {
    fontSize: 16
  },
  timeContainer: {
    marginTop: 16
  },
  timeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  selectedTimeCard: {
    backgroundColor: '#a0c8ea'
  },
  timeText: {
    fontSize: 16
  },
  confirmButton: {
    backgroundColor: '#a0c8ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Schedules;
