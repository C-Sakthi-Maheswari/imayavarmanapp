import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function EventsScreen() {
  // Dummy events data
  const events = [
    { id: '1', title: 'Silambam Workshop', date: '2025-11-05' },
    { id: '2', title: 'Tournament', date: '2025-11-15' },
    { id: '3', title: 'Cultural Program', date: '2025-12-01' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  eventCard: {
    backgroundColor: '#e6f2ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  eventTitle: { fontSize: 18, fontWeight: '600' },
  eventDate: { fontSize: 14, color: '#555', marginTop: 5 },
});
