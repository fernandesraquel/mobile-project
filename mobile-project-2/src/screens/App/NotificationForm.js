import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, StatusBar, Image } from 'react-native';
import { fetchStudents, insertSendNotification, createSendNotificationTable } from '../../data/database'; 
import { MaterialCommunityIcons as MCIcons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext'; // Corrija o caminho se necessário

const NotificationForm = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Obter o usuário logado do contexto
  const [content, setContent] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isAllStudents, setIsAllStudents] = useState(true);

  useEffect(() => {
    // Cria a tabela de notificações ao iniciar a tela
    createSendNotificationTable();
    // Carregar a lista de estudantes
    fetchStudents(setStudents);

    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCIcons name='chevron-left' size={30} color='#3c40c6' />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Cadastrar Notificação</Text>
        </View>
      ),
    });

    StatusBar.setBarStyle('dark-content', true);
  }, [navigation]);

  const handleSubmit = () => {
    if (content.trim() === '') {
      Alert.alert('Erro', 'O conteúdo da notificação não pode estar vazio.');
      return;
    }

    if (!user) {
      Alert.alert('Erro', 'Usuário não está logado.');
      return;
    }

    const senderId = user.id;

    if (isAllStudents) {
      insertSendNotification({
        senderId,
        recipientId: null,
        recipientType: 'all_students',
        content,
      });
    } else if (selectedStudentId) {
      insertSendNotification({
        senderId,
        recipientId: selectedStudentId,
        recipientType: 'students',
        content,
      });
    } else {
      Alert.alert('Erro', 'Selecione um estudante para enviar a notificação.');
      return;
    }

    Alert.alert('Sucesso', 'Notificação enviada com sucesso!');
    setContent('');
    setSelectedStudentId(null);
    setIsAllStudents(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Conteúdo da notificação"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[styles.radioButton, isAllStudents && styles.selectedRadioButton]}
          onPress={() => setIsAllStudents(true)}
        >
          <Text style={styles.radioText}>Para todos os estudantes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, !isAllStudents && styles.selectedRadioButton]}
          onPress={() => setIsAllStudents(false)}
        >
          <Text style={styles.radioText}>Para um estudante específico</Text>
        </TouchableOpacity>
      </View>

      {!isAllStudents && (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.studentButton,
                item.id === selectedStudentId && styles.selectedStudentButton
              ]}
              onPress={() => setSelectedStudentId(item.id)}
            >
              <View style={styles.studentInfo}>
                <Image source={{ uri: item.profile_image }} style={styles.studentImage} />
                <View style={styles.studentDetails}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentInstitution}>{item.institution}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Notificação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
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
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedRadioButton: {
    backgroundColor: '#DFDEF1',
    borderColor: '#DFDEF1',
  },
  radioText: {
    fontSize: 16,
  },
  studentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedStudentButton: {
    backgroundColor: '#DFDEF1',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  studentDetails: {
    flexDirection: 'column',
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentInstitution: {
    fontSize: 14,
    color: '#777',
  },
  submitButton: {
    backgroundColor: '#3c40c6',
    paddingVertical: 12,
    borderRadius: 22,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    alignSelf: 'center',
  },
});

export default NotificationForm;

