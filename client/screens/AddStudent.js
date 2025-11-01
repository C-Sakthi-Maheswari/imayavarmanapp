import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddStudent({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/students', { name, email, contact });
      Alert.alert('Success', 'Student added successfully');
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to add student');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contact" value={contact} onChangeText={setContact} />
      <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20,backgroundColor:'#e6f2ff'},
  title:{fontSize:24,fontWeight:'700',marginBottom:20,color:'#0073e6'},
  input:{width:'80%',height:50,borderColor:'#ccc',borderWidth:1,borderRadius:8,paddingHorizontal:15,marginBottom:15,backgroundColor:'#fff'},
  button:{width:'80%',height:50,backgroundColor:'#0073e6',borderRadius:8,justifyContent:'center',alignItems:'center'},
  buttonText:{color:'#fff',fontSize:18,fontWeight:'600'}
});
