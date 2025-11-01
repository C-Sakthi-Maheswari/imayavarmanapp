import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function AdminDashboard({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddStudent')}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEvent')}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Events')}>
        <Text style={styles.buttonText}>View Events</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 30 },
  button: { backgroundColor: '#0073e6', padding: 15, borderRadius: 10, marginVertical: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
