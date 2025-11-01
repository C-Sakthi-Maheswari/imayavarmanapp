// screens/StudentProfile.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StudentProfile() {
  // Dummy student data
  const profile = {
    name: 'Sakthi Maheswari',
    studentId: 'STU123',
    classLevel: '5th Grade',
    email: 'sakthi@example.com',
    facebook: 'sakthiFB',
    instagram: 'sakthiInsta',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>Name: <Text style={styles.value}>{profile.name}</Text></Text>
        <Text style={styles.label}>ID: <Text style={styles.value}>{profile.studentId}</Text></Text>
        <Text style={styles.label}>Class: <Text style={styles.value}>{profile.classLevel}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{profile.email}</Text></Text>
        <Text style={styles.label}>Facebook: <Text style={styles.value}>@{profile.facebook}</Text></Text>
        <Text style={styles.label}>Instagram: <Text style={styles.value}>@{profile.instagram}</Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fa', padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 3 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 15 },
  label: { fontSize: 16, marginVertical: 5, fontWeight: '500' },
  value: { fontWeight: '400', color: '#555' },
});
