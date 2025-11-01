import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AttendanceScreen() {
  const attendance = [
    { date: '2025-11-01', status: 'Present' },
    { date: '2025-11-02', status: 'Absent' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      {attendance.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text>{item.date}</Text>
          <Text>{item.status}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
