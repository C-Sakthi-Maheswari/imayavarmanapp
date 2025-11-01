import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StudentProfile() {
  // Dummy student data
  const student = {
    name: 'Sakthi Maheswari',
    email: 'sakthi@example.com',
    contact: '1234567891',
    social: '@sakthim',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.item}>Name: {student.name}</Text>
      <Text style={styles.item}>Email: {student.email}</Text>
      <Text style={styles.item}>Contact: {student.contact}</Text>
      <Text style={styles.item}>Social: {student.social}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 10 },
});
