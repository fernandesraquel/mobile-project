import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import dataBase from '../../data/users';

const Clocks = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const groupStudentsByShift = () => {
    const shifts = {
      manhã: { times: ['05:40 AM', '11:40 AM'], students: [] },
      tarde: { times: ['05:40 PM', '12:30 PM'], students: [] },
      noite: { times: ['07:30 PM', '10:00 PM'], students: [] },
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

  const filterStudents = (students) => {
    if (selectedFilter === 'Todos') return students;
    return students.filter(student => student.type === selectedFilter.toLowerCase());
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Image source={{ uri: item.userImage }} style={styles.studentAvatar} />
    </View>
  );

  const handleAddPress = () => {
    navigation.navigate('AppStack', { screen: 'Schedules'});
  };

  const renderShiftSection = (shiftName) => (
    <View style={styles.cardContainer}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('AppStack', { 
            screen: 'ScheduleDetails', 
            params: {
              shiftName,
              times: shifts[shiftName].times,
              students: filterStudents(shifts[shiftName].students)
            }
          });
        }}
        >
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
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <FilterBar />
      {renderShiftSection('manhã')}
      {renderShiftSection('tarde')}
      {renderShiftSection('noite')}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddPress}
        activeOpacity={0.7}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    marginTop: 15
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
    backgroundColor: '#3c40c6',
    marginBottom: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#3c40c6',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTimes: {
    fontSize: 14,
    color: '#222',
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
    borderWidth: 2,
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
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#DFDEF1',
  },
  filterButtonActive: {
    backgroundColor: '#DFDEF1',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#222',
  },
  filterButtonTextActive: {
    color: '#3c40c6',
    fontWeight: '600'
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3c40c6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default Clocks;
