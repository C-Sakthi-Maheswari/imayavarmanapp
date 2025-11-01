import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StudentProfile() {
  // Dummy student data
  const student = {
    name: 'Sakthi Maheswari',
    email: 'sakthi@example.com',
    contact: '1234567891',
    social: '@sakthim',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{student.name}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{student.contact}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Social:</Text>
          <Text style={styles.value}>{student.social}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
});
