import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import StudentDashboard from './screens/StudentDashboard';
import StudentProfile from './screens/StudentProfile';
import AttendanceScreen from './screens/AttendanceScreen';
import EventsScreen from './screens/EventsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'student'

  // Simulate async login check (or you can fetch from AsyncStorage)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setUserRole={setUserRole} />}
        </Stack.Screen>

        {/* Admin Dashboard & related screens */}
        {userRole === 'admin' && (
          <>
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="Events" component={EventsScreen} />
          </>
        )}

        {/* Student Dashboard & related screens */}
        {userRole === 'student' && (
          <>
            <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
            <Stack.Screen name="StudentProfile" component={StudentProfile} />
            <Stack.Screen name="Attendance" component={AttendanceScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
