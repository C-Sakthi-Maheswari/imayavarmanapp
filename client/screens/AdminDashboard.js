import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e6f2ff'},
  title:{fontSize:24,fontWeight:'700',marginBottom:30,color:'#0073e6'},
  button:{width:'80%',height:50,backgroundColor:'#0073e6',borderRadius:8,justifyContent:'center',alignItems:'center',marginBottom:15},
  buttonText:{color:'#fff',fontSize:18,fontWeight:'600'}
});
