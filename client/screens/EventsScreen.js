import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function EventsScreen() {
  const events = [
    { id: 1, name: 'Silambam Competition', date: '2025-12-05' },
    { id: 2, name: 'Belt Grading', date: '2025-12-12' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Events</Text>
      {events.map(event => (
        <View key={event.id} style={styles.eventCard}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventDate}>{event.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  eventCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  eventName: { fontSize: 16, fontWeight: '600' },
  eventDate: { fontSize: 14, color: '#666', marginTop: 5 },
});
