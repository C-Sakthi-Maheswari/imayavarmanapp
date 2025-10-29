import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function EventForm({ route, navigation }) {
  const event = route.params?.event;

  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [date, setDate] = useState(event?.date || '');
  const [venue, setVenue] = useState(event?.venue || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !date || !venue) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      if (event) {
        await api.put(`/events/${event._id}`, { title, description, date, venue });
        Alert.alert('Success', 'Event updated successfully');
      } else {
        await api.post('/events', { title, description, date, venue });
        Alert.alert('Success', 'Event added successfully');
      }
      navigation.goBack();
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Error', 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event ? 'Edit Event' : 'Add Event'}</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Venue" value={venue} onChangeText={setVenue} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Save</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e6f2ff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20, color: '#0073e6', textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  submitButton: { backgroundColor: '#0073e6', padding: 15, borderRadius: 10, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
