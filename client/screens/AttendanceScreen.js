import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';

import api from '../services/api';

export default function AttendanceScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  const takePicture = async () => {
    if (!cameraRef) return;

    try {
      const photo = await cameraRef.takePictureAsync({ base64: true, quality: 0.5 });
      setCapturedPhoto(photo.uri);
      await sendForRecognition(photo.base64);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to capture photo.');
    }
  };

  const sendForRecognition = async (base64Image) => {
    setLoading(true);
    try {
      // Send image to backend (which calls Flask service)
      const res = await api.post('/attendance/recognize', { image: base64Image });

      if (res.data.matchedStudentId) {
        // Update attendance in backend
        await api.post('/attendance', { studentId: res.data.matchedStudentId });
        Alert.alert('Success', `Attendance marked for Student ID: ${res.data.matchedStudentId}`);

      } else {
        Alert.alert('No Match', 'No student face matched. Try again.');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Error', 'Failed to mark attendance');
    } finally {
      setLoading(false);
      setCapturedPhoto(null);
    }
  };

  return (
    <View style={styles.container}>
      {capturedPhoto ? (
        <Image source={{ uri: capturedPhoto }} style={styles.preview} />
      ) : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={ref => setCameraRef(ref)} />
        </View>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Recognizing...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={takePicture} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Mark Attendance</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6f2ff' },
  cameraContainer: { flex: 1, width: '100%' },
  camera: { flex: 1 },
  preview: { flex: 1, width: '100%' },
  button: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { color: '#fff', marginTop: 10, fontSize: 16, fontWeight: '600' },
});
