import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import dataBase from '../../data/users';

const Feed = () => {

  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const groupStudentsByShift = () => {
    const shifts = {
      manhã: {
        times: ['05:40 AM', '11:40 AM'],
        students: []
      },
      tarde: {
        times: ['05:40 PM', '12:30 PM'],
        students: []
      },
      noite: {
        times: ['07:30 PM', '10:00 PM'],
        students: []
      }
    };

    const seenStudents = new Set();

    dataBase.forEach(student => {
      Object.keys(student.shifts).forEach(shiftName => {
        const shift = student.shifts[shiftName];
        shift.ida.forEach(time => {
          if (shifts[shiftName].times.includes(time) && !seenStudents.has(student.userName)) {
            shifts[shiftName].students.push({ ...student, reservationTime: time, type: 'ida' });
            seenStudents.add(student.userName);
          }
        });
        shift.volta.forEach(time => {
          if (shifts[shiftName].times.includes(time) && !seenStudents.has(student.userName)) {
            shifts[shiftName].students.push({ ...student, reservationTime: time, type: 'volta' });
            seenStudents.add(student.userName);
          }
        });
      });
    });

    return shifts;
  };

  const shifts = groupStudentsByShift();

  // Filtra os estudantes com base no filtro selecionado
  const filterStudents = (students) => {
    if (selectedFilter === 'Todos') {
      return students;
    }
    return students.filter(student => student.type === selectedFilter.toLowerCase());
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Image source={{ uri: item.userImage }} style={styles.studentAvatar} />
    </View>
  );

  const renderShiftSection = (shiftName) => (
    <View style={styles.cardContainer}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{shiftName.charAt(0).toUpperCase() + shiftName.slice(1)}</Text>
        <Text style={styles.cardTimes}>{shifts[shiftName].times.join(', ')}</Text>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          data={filterStudents(shifts[shiftName].students)}
          renderItem={renderStudentItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  const FilterBar = () => (
    <View style={styles.filterBar}>
      {['Todos', 'Ida', 'Volta'].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.filterButtonActive
          ]}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === filter && styles.filterButtonTextActive
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <View style={styles.container}>
      <FilterBar />
      {renderShiftSection('manhã')}
      {renderShiftSection('tarde')}
      {renderShiftSection('noite')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineContainer: {
    width: 2,
    alignItems: 'center',
    marginRight: 20,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginBottom: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#007bff',
  },
  card: {
    flex: 1,
    backgroundColor: '#aeb0d4',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTimes: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  studentItem: {
    flexDirection: 'row',
    marginLeft: -16,
    paddingVertical: 8,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 8,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#aeb0d4',
  },
  filterButtonActive: {
    backgroundColor: '#aeb0d4',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#555',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
});

export default Feed;
