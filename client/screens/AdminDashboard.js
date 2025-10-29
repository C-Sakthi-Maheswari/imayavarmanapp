import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminDashboard({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StudentList')}
      >
        <Text style={styles.buttonText}>Manage Students</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AttendanceScreen')}
      >
        <Text style={styles.buttonText}>Mark Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EventsScreen')}
      >
        <Text style={styles.buttonText}>Manage Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#cc0000' }]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#0073e6',
  },
  button: {
    width: '90%',
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
