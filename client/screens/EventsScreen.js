import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';

export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEventScreen')}
      >
        <Text style={styles.addButtonText}>+ Add Event</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.info}>Date: {item.date}</Text>
            <Text style={styles.info}>Description: {item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5faff', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#0073e6', marginBottom: 10 },
  addButton: {
    backgroundColor: '#0073e6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#000' },
  info: { color: '#555' },
});
