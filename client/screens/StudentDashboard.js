import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StudentDashboard({ navigation, route }) {
  // student ID passed from LoginScreen
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('StudentProfile', { id })}
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AttendanceScreen', { id })}
      >
        <Text style={styles.buttonText}>Mark Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EventsScreen')}
      >
        <Text style={styles.buttonText}>View Events</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e6f2ff',padding:20},
  title:{fontSize:24,fontWeight:'700',marginBottom:30,color:'#0073e6'},
  button:{width:'80%',height:50,backgroundColor:'#0073e6',borderRadius:8,justifyContent:'center',alignItems:'center',marginBottom:15},
  buttonText:{color:'#fff',fontSize:18,fontWeight:'600'}
});
