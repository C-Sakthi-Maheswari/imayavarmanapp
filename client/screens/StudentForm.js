// screens/StudentForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function StudentForm() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !studentId || !classLevel || !email) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    // For now, just show alert
    Alert.alert('Success', `Student ${name} added!`);
    // Reset form
    setName(''); setStudentId(''); setClassLevel(''); setEmail('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add / Edit Student</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Student ID" value={studentId} onChangeText={setStudentId} />
      <TextInput style={styles.input} placeholder="Class" value={classLevel} onChangeText={setClassLevel} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Student</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fa', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#0073e6', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
