import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchShifts, getShiftTimesByShiftId, insertReservation } from '../../data/database';

const ReserveShift = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [departureTimes, setDepartureTimes] = useState([]);
  const [returnTimes, setReturnTimes] = useState([]);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(null);
  const [selectedReturnTime, setSelectedReturnTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        try {
          const fetchedShifts = await fetchShifts(); // Busca todos os turnos
          setShifts(fetchedShifts);
          StatusBar.setBarStyle('dark-content', true);
        } catch (error) {
          console.error('Error fetching shifts:', error);
          Alert.alert('Erro', 'Erro ao carregar os turnos.');
        }
      } else {
        Alert.alert('Erro', 'Usuário não autenticado.');
      }
    };

    fetchData();
  }, [user]);

  const loadShiftTimes = async (shiftId) => {
    try {
      const fetchedTimes = await getShiftTimesByShiftId(shiftId);
      
      const departures = fetchedTimes.filter(time => time.departure_time);
      const returns = fetchedTimes.filter(time => time.return_time);

      setSelectedShift(shiftId);
      setDepartureTimes(departures);
      setReturnTimes(returns);
    } catch (error) {
      console.error('Error fetching shift times:', error);
      Alert.alert('Erro', 'Erro ao carregar os horários do turno.');
    }
  };

  const reserveShift = async () => {
    if (!user || !user.id || !selectedDepartureTime || !selectedReturnTime) {
      Alert.alert('Erro', 'Por favor, selecione horários de ida e volta.');
      return;
    }

    try {
      await insertReservation({
        student_id: user.id,
        departure_time: selectedDepartureTime.departure_time,
        return_time: selectedReturnTime.return_time,
      });
      Alert.alert('Sucesso', 'Reserva realizada com sucesso!');
      setSelectedDepartureTime(null);
      setSelectedReturnTime(null);
    } catch (error) {
      console.error('Error reserving shift:', error);
      Alert.alert('Erro', 'Erro ao realizar a reserva.');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Reservar Turno</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 2 }}
          onPress={() => Alert.alert('Opções', 'Botão de opções pressionado')}
        >
          <MCIcons name='dots-vertical' color='#222' size={24} />
        </TouchableOpacity>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  const renderShiftCard = ({ item: shift }) => (
    <View style={styles.shiftCard}>
      <Text style={styles.shiftTitle}>{shift.name}</Text>
      {selectedShift === shift.id && (
        <>
          <View style={styles.timeSection}>
            <Text style={styles.timeTitle}>Horários de Ida:</Text>
            <View style={styles.timeRow}>
              {departureTimes.length > 0 ? (
                departureTimes.map(time => (
                  <TouchableOpacity
                    key={time.departure_time}
                    style={[styles.timeButton, selectedDepartureTime === time && styles.selectedTimeButton]}
                    onPress={() => setSelectedDepartureTime(time)}
                  >
                    <Text style={[styles.timeText, selectedDepartureTime === time && styles.selectedTimeText]}>{time.departure_time}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noDataText}>Nenhum horário disponível.</Text>
              )}
            </View>
          </View>

          <View style={styles.timeSection}>
            <Text style={styles.timeTitle}>Horários de Volta:</Text>
            <View style={styles.timeRow}>
              {returnTimes.length > 0 ? (
                returnTimes.map(time => (
                  <TouchableOpacity
                    key={time.return_time}
                    style={[styles.timeButton, selectedReturnTime === time && styles.selectedTimeButton]}
                    onPress={() => setSelectedReturnTime(time)}
                  >
                    <Text style={[styles.timeText, selectedReturnTime === time && styles.selectedTimeText]}>{time.return_time}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noDataText}>Nenhum horário disponível.</Text>
              )}
            </View>
          </View>
        </>
      )}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => loadShiftTimes(shift.id)}
      >
        <Text style={styles.selectButtonText}>{selectedShift === shift.id ? 'Fechar Horários' : 'Mostrar Horários'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={shifts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderShiftCard}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={reserveShift}
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
    paddingHorizontal: 16,
    backgroundColor: '#fafafa'
  },
  shiftCard: {
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
    color: '#000',
    marginBottom: 10
  },
  timeSection: {
    marginBottom: 10
  },
  timeTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  timeRow: {
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
    fontWeight: 'bold'
  },
  noDataText: {
    color: '#888',
    textAlign: 'center'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default ReserveShift;
