import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
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

  // Validation functions
  const validateStudentId = (id) => {
    return id.length >= 3;
  };

  const validateClassName = (cls) => {
    return cls.trim().length > 0;
  };

  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
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

  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Gallery permission is required to select photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setFaceImage(result.assets[0]);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: pickImageFromCamera },
        { text: 'Choose from Gallery', onPress: pickImageFromGallery },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSubmit = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter student name');
      return;
    }

    if (!studentId.trim() || !validateStudentId(studentId)) {
      Alert.alert('Validation Error', 'Please enter a valid student ID (minimum 3 characters)');
      return;
    }

    if (!className.trim() || !validateClassName(className)) {
      Alert.alert('Validation Error', 'Please enter a valid class');
      return;
    }

    if (!student && !faceImage) {
      Alert.alert('Validation Error', 'Please upload a face image for new students');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('studentId', studentId.trim());
      formData.append('class', className.trim());
      formData.append('facebook', facebook.trim());
      formData.append('instagram', instagram.trim());

      if (faceImage) {
        formData.append('faceImage', {
          uri: faceImage.uri,
          name: `face_${studentId}.jpg`,
          type: 'image/jpeg',
        });
      }

      if (student) {
        await api.put(`/students/${student._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Success', 'Student updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await api.post('/students', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Success', 'Student added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (err) {
      console.error('Error saving student:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'Failed to save student. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{student ? 'Edit Student' : 'Add New Student'}</Text>

        <View style={styles.formSection}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Student ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter student ID"
            value={studentId}
            onChangeText={setStudentId}
            autoCapitalize="characters"
            editable={!student}
          />

          <Text style={styles.label}>Class *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Grade 10-A"
            value={className}
            onChangeText={setClassName}
          />

          <Text style={styles.label}>Facebook</Text>
          <TextInput
            style={styles.input}
            placeholder="Facebook username (optional)"
            value={facebook}
            onChangeText={setFacebook}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder="Instagram username (optional)"
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Face Image {!student && '*'}</Text>
          
          {faceImage && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: faceImage.uri }} style={styles.imagePreview} />
              <Text style={styles.imagePreviewText}>Image selected ✓</Text>
            </View>
          )}

          <TouchableOpacity style={styles.imageButton} onPress={showImageOptions}>
            <Text style={styles.imageButtonText}>
              {faceImage ? '📷 Change Face Image' : '📷 Upload Face Image'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
          onPress={handleSubmit} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              {student ? 'Update Student' : 'Add Student'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f8fa' 
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    marginBottom: 25, 
    color: '#0073e6', 
    textAlign: 'center' 
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#0073e6',
  },
  imagePreviewText: {
    marginTop: 8,
    color: '#28a745',
    fontWeight: '600',
  },
  imageButton: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  imageButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700' 
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});