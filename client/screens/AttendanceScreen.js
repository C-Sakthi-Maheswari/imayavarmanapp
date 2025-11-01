import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function AttendanceScreen() {
  const markAttendance = () => {
    // Dummy attendance logic
    Alert.alert('Attendance', 'Attendance marked successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      <Text style={styles.info}>Click below to mark your attendance</Text>

      <TouchableOpacity style={styles.button} onPress={markAttendance}>
        <Text style={styles.buttonText}>Mark Attendance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
