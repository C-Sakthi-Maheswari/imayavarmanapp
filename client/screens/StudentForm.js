import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

export default function StudentForm({ route, navigation }) {
  const student = route.params?.student;

  const [name, setName] = useState(student?.name || '');
  const [studentId, setStudentId] = useState(student?.studentId || '');
  const [className, setClassName] = useState(student?.class || '');
  const [facebook, setFacebook] = useState(student?.facebook || '');
  const [instagram, setInstagram] = useState(student?.instagram || '');
  const [faceImage, setFaceImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission is required to upload face image.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setFaceImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !studentId || !className) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('studentId', studentId);
      formData.append('class', className);
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);

      if (faceImage) {
        formData.append('faceImage', {
          uri: faceImage.uri,
          name: `face_${studentId}.jpg`,
          type: 'image/jpeg',
        });
      }

      if (student) {
        // Update existing student
        await api.put(`/students/${student._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Success', 'Student updated successfully');
      } else {
        // Add new student
        await api.post('/students', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Success', 'Student added successfully');
      }

      navigation.goBack();
    } catch (err) {
      console.error('Error saving student:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{student ? 'Edit Student' : 'Add Student'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />
      <TextInput
        style={styles.input}
        placeholder="Class"
        value={className}
        onChangeText={setClassName}
      />
      <TextInput
        style={styles.input}
        placeholder="Facebook"
        value={facebook}
        onChangeText={setFacebook}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram"
        value={instagram}
        onChangeText={setInstagram}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {faceImage ? 'Change Face Image' : 'Upload Face Image'}
        </Text>
      </TouchableOpacity>

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
  imageButton: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
