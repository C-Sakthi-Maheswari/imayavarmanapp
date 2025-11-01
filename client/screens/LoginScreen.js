import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation, setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login button pressed');

    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      console.log('Response:', response.data);

      // ✅ Use setUserRole from props
      setUserRole(response.data.role);

      if (response.data.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else {
        navigation.replace('StudentDashboard', { id: response.data.id });
      }
    } catch (err) {
      console.log('Error:', err.response?.data || err.message);
      Alert.alert('Login failed', 'Check your credentials');
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Silambam Login</Text>

          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, justifyContent:'center', alignItems:'center', backgroundColor:'#e6f2ff', padding:20 },
  card: { width:'100%', backgroundColor:'#fff', borderRadius:12, padding:30, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.2, shadowRadius:8, elevation:5 },
  title: { fontSize:24, fontWeight:'700', marginBottom:25, textAlign:'center', color:'#0073e6' },
  input: { width:'100%', height:50, borderColor:'#ccc', borderWidth:1, borderRadius:8, paddingHorizontal:15, marginBottom:15, backgroundColor:'#f9f9f9' },
  button: { width:'100%', height:50, backgroundColor:'#0073e6', borderRadius:8, justifyContent:'center', alignItems:'center', marginTop:10 },
  buttonText: { color:'#fff', fontWeight:'600', fontSize:18 }
});
