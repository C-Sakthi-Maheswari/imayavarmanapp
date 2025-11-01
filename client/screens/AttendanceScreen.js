import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AttendanceScreen() {
  // Dummy attendance data for a month (P = Present, A = Absent)
  const attendance = [
    'P','A','P','P','P','A','P',
    'P','P','A','P','P','P','P',
    'A','P','P','P','A','P','P',
    'P','P','P','A','P','P','P',
    'P','A','P','P','P','P','A'
  ];

  // Generate day numbers for the month (assuming 35 days for simplicity in grid)
  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Attendance Calendar</Text>

        <View style={styles.grid}>
          {days.map((day, index) => {
            const status = attendance[index] || '-';
            return (
              <View
                key={index}
                style={[
                  styles.dayBox,
                  status === 'P' ? styles.present : status === 'A' ? styles.absent : styles.noData
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
                <Text style={styles.statusText}>{status}</Text>
              </View>
            );
          })}
        </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayBox: {
    width: 45,
    height: 45,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  present: {
    backgroundColor: '#4caf50', // Green for present
  },
  absent: {
    backgroundColor: '#f44336', // Red for absent
  },
  noData: {
    backgroundColor: '#ddd', // Gray for no data
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});
