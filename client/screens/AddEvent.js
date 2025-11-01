import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddEvent({ navigation }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleAddEvent = async () => {
    if (!name || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await axios.post('http://10.0.2.2:5000/api/admin/events', { name, date }); 
      // Note: Use 10.0.2.2 for Android Emulator (not localhost)
      Alert.alert('Success', 'Event added successfully');
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to add event');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
