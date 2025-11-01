import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = login(email, password); // use context login
    setLoading(false);

    if (result.success) {
      // Role is automatically set in context, navigation will react
      Alert.alert('Login Successful', `Logged in as ${email}`);
    } else {
      Alert.alert('Login Failed', result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Imayavaram Training Centre</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f2ff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 25, textAlign: 'center', color: '#0073e6' },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#f9f9f9' },
  button: { width: '100%', height: 50, backgroundColor: '#0073e6', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 18 },
});
