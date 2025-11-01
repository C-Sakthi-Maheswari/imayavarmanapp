import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminDashboard({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* Student Management */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddStudent')}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

      {/* Event Management */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEvent')}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Events')}>
        <Text style={styles.buttonText}>View Events</Text>
      </TouchableOpacity>

      {/* Attendance */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Attendance')}>
        <Text style={styles.buttonText}>Student Attendance</Text>
      </TouchableOpacity>

      {/* Superstar of Month/Year */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SuperstarMonth')}>
        <Text style={styles.buttonText}>Superstar of the Month</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SuperstarYear')}>
        <Text style={styles.buttonText}>Superstar of the Year</Text>
      </TouchableOpacity>

      {/* Achievements */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Achievements')}>
        <Text style={styles.buttonText}>Achievements</Text>
      </TouchableOpacity>

      {/* Class Timings & Batches */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassTimings')}>
        <Text style={styles.buttonText}>Class Timings & Batches</Text>
      </TouchableOpacity>

      {/* About Us */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AboutUs')}>
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>

      {/* Leave Updates */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LeaveUpdates')}>
        <Text style={styles.buttonText}>Leave Updates</Text>
      </TouchableOpacity>

      {/* Lessons & Tutorials */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lessons')}>
        <Text style={styles.buttonText}>Lessons & Tutorials</Text>
      </TouchableOpacity>

      {/* Gallery */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gallery')}>
        <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>

      {/* Fee Details */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeeDetails')}>
        <Text style={styles.buttonText}>Fee Details</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
