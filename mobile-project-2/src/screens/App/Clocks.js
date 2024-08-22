import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { fetchShifts, fetchShiftTimes, fetchSchedules, fetchStudents } from '../../data/database'; // Ajuste os imports conforme necessário
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';

const Clocks = ({ navigation }) => {
  const [shifts, setShifts] = useState([]);
  const [shiftTimes, setShiftTimes] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedShifts = await fetchShifts();
        setShifts(fetchedShifts);

        const times = {};
        for (const shift of fetchedShifts) {
          const shiftTimes = await fetchShiftTimes(shift.id);
          times[shift.id] = shiftTimes;
        }
        setShiftTimes(times);

        const fetchedSchedules = await fetchSchedules();
        setSchedules(fetchedSchedules);

        const fetchedStudents = await fetchStudents();
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();

    // Configuração da navegação
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Horários</Text>
        </View>
      ),
    });

    // Configurar o estilo da barra de status
    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  const renderCard = ({ item: shift }) => {
    const availableTimes = shiftTimes[shift.id] || [];
    const shiftSchedules = schedules.filter(schedule => schedule.shift_id === shift.id);

    // Mapear IDs dos estudantes para suas imagens
    const studentImages = shiftSchedules.map(schedule => {
      const student = students.find(student => student.id === schedule.student_id);
      return student ? student.profile_image : null;
    }).filter(image => image); // Filtra valores nulos

    return (
      <View style={styles.card}>
        <Text style={styles.shiftName}>{shift.name}</Text>
        <Text style={styles.subTitle}>
          Horários Disponíveis: {availableTimes.map(time => time.departure_time).join(', ')}
        </Text>

        <View style={styles.studentsContainer}>
          {studentImages.map((image, index) => (
            image ? (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.studentImage}
              />
            ) : null
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum horário disponível.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
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
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  shiftName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#666',
  },
  studentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  studentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default Clocks;
