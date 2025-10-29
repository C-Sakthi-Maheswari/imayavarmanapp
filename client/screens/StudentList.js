import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function StudentList({ navigation }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students'); // GET /api/students
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('StudentForm', { student: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>ID: {item.studentId} | Class: {item.class}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('StudentForm')}
      >
        <Text style={styles.addButtonText}>+ Add Student</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0073e6" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.studentId}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e6f2ff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 15, color: '#0073e6' },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#333' },
  details: { fontSize: 14, color: '#555', marginTop: 3 },
  addButton: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
