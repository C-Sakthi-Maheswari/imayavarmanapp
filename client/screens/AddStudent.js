import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleAdd = () => {
    Alert.alert('Student Added', `Name: ${name}\nID: ${studentId}`);
    setName('');
    setStudentId('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Student ID" value={studentId} onChangeText={setStudentId} />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginVertical: 10 },
  button: { backgroundColor: '#0073e6', padding: 15, borderRadius: 10, marginTop: 15, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
