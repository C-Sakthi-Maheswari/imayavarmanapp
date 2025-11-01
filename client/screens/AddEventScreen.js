import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const addEvent = async () => {
    if (!title || !date || !description) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      await api.post('/events', { title, date, description });
      Alert.alert('Success', 'Event added successfully');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add event');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Event Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={addEvent}>
        <Text style={styles.buttonText}>Save Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5faff', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#0073e6', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
});
