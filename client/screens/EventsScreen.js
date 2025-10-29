import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

export default function EventsScreen({ navigation }) {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events'); // GET /api/events
      setEvents(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Error', 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/events/${eventId}`);
            Alert.alert('Deleted', 'Event deleted successfully');
            fetchEvents(); // Refresh list
          } catch (err) {
            console.error(err.response?.data || err.message);
            Alert.alert('Error', 'Failed to delete event');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDetails}>{item.date} | {item.venue}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>

      {user.role === 'admin' && (
        <View style={styles.adminButtons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#0073e6' }]}
            onPress={() => navigation.navigate('EventForm', { event: item })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#cc0000' }]}
            onPress={() => handleDelete(item._id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>

      {user.role === 'admin' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('EventForm')}
        >
          <Text style={styles.addButtonText}>+ Add Event</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0073e6" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e6f2ff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 15, color: '#0073e6' },
  addButton: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  eventTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  eventDetails: { fontSize: 14, color: '#555', marginVertical: 5 },
  eventDescription: { fontSize: 14, color: '#444' },
  adminButtons: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  button: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
