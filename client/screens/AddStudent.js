import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddStudent({ navigation }) {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [fee, setFee] = useState('');
  const [batch, setBatch] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  const handleSubmit = () => {
    if (!name || !fatherName || !address || !phone || !dob || !sex || !fee || !batch) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const studentData = { name, fatherName, address, phone, dob, sex, fee, batch, photo };
    console.log('Student Data:', studentData);
    Alert.alert('Success', 'Student added successfully!');

    // Reset form
    setName('');
    setFatherName('');
    setAddress('');
    setPhone('');
    setDob('');
    setSex('');
    setFee('');
    setBatch('');
    setPhoto(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter student name" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Father Name</Text>
        <TextInput style={styles.input} value={fatherName} onChangeText={setFatherName} placeholder="Enter father's name" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Enter phone number" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age / DOB</Text>
        <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="DD/MM/YYYY" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sex</Text>
        <TextInput style={styles.input} value={sex} onChangeText={setSex} placeholder="Male / Female" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fee</Text>
        <TextInput style={styles.input} value={fee} onChangeText={setFee} keyboardType="numeric" placeholder="Enter fee" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Batch</Text>
        <TextInput style={styles.input} value={batch} onChangeText={setBatch} placeholder="Enter batch" />
      </View>

      <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
        <Text style={styles.buttonText}>{photo ? 'Change Photo' : 'Upload Photo'}</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo.uri }} style={styles.photo} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff', // white background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  photoButton: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  photo: { width: 120, height: 120, borderRadius: 8, marginTop: 10, alignSelf: 'center' },
});
