// CalStTimings.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CalStTimings() {
  // Dummy batch data
  const batches = [
    { name: 'Batch A', days: 'Mon, Wed, Fri', timing: '6:00 PM - 8:00 PM', students: 15 },
    { name: 'Batch B', days: 'Tue, Thu', timing: '5:00 PM - 7:00 PM', students: 12 },
    { name: 'Batch C', days: 'Sat, Sun', timing: '10:00 AM - 12:00 PM', students: 18 },
    { name: 'Batch D', days: 'Mon, Thu', timing: '7:00 PM - 9:00 PM', students: 10 },
    { name: 'Batch E', days: 'Wed, Fri, Sat', timing: '4:00 PM - 6:00 PM', students: 20 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Batches & Timings</Text>

        {batches.map((batch, index) => (
          <View key={index} style={styles.batchCard}>
            <Text style={styles.batchName}>{batch.name}</Text>
            <Text style={styles.detail}>Days: {batch.days}</Text>
            <Text style={styles.detail}>Timing: {batch.timing}</Text>
            <Text style={styles.detail}>No. of Students: {batch.students}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  batchCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  batchName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0073e6',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});
