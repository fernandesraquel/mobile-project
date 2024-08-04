import React, {useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import { Feather as Icon, MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';

// Função para agrupar estudantes por horário
const groupStudentsByTime = (students) => {
  return students.reduce((acc, student) => {
    const { reservationTime } = student;
    if (!acc[reservationTime]) {
      acc[reservationTime] = [];
    }
    acc[reservationTime].push(student);
    return acc;
  }, {});
};

const ScheduleDetails = ({ route, navigation }) => {
  const { shiftName, students } = route.params;

  // Agrupando estudantes por horário
  const groupedStudents = groupStudentsByTime(students);
  const times = Object.keys(groupedStudents);

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Image source={{ uri: item.userImage }} style={styles.studentAvatar} />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.userName}</Text>
        <Text style={styles.studentInstitution}>{item.institution}</Text>
      </View>
    </View>
  );

  const renderStudentSection = ({ item: time }) => {
    const studentsForTime = groupedStudents[time] || [];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{time}</Text>
        {studentsForTime.length > 0 ? (
          <FlatList
            data={studentsForTime}
            renderItem={renderStudentItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noStudents}>Não há alunos agendados para este horário.</Text>
        )}
      </View>
    );
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
          <Text style={styles.titleHeader}>{shiftName}</Text>
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
  }, [navigation, shiftName]);

  return (
    <View style={styles.container}>
      {times.length > 0 ? (
        <FlatList
          data={times}
          renderItem={renderStudentSection}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noStudents}>Não há horários disponíveis.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  titleHeader: {
    fontWeight: 'bold',
    color: '#3c40c6',
    fontSize: 22
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  studentInstitution: {
    fontSize: 14,
    color: '#666',
  },
  noStudents: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default ScheduleDetails;




