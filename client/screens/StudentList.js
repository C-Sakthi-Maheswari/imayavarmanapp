import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function StudentList({ navigation }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/admin/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch students');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('StudentForm')}>
        <Text style={styles.addButtonText}>+ Add Student</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentForm', { student: item })}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>ID: {item.studentId}</Text>
            <Text style={styles.info}>Class: {item.classLevel}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f5faff', padding:20 },
  title: { fontSize:24, fontWeight:'700', color:'#0073e6', marginBottom:10 },
  addButton: { backgroundColor:'#0073e6', padding:12, borderRadius:8, alignItems:'center', marginBottom:10 },
  addButtonText: { color:'#fff', fontWeight:'700', fontSize:16 },
  card: { backgroundColor:'#fff', padding:15, borderRadius:10, marginBottom:10, elevation:2 },
  name: { fontSize:18, fontWeight:'600', color:'#000' },
  info: { color:'#555' },
});
