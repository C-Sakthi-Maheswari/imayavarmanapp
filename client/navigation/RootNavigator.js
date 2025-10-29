import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import AdminDashboard from '../screens/AdminDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import AttendanceScreen from '../screens/AttendanceScreen';
import EventsScreen from '../screens/EventsScreen';
import EventForm from '../screens/EventForm';
import StudentForm from '../screens/StudentForm';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : user.role === 'admin' ? (
        <>
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="EventForm" component={EventForm} />
          <Stack.Screen name="StudentForm" component={StudentForm} />
        </>
      ) : (
        <>
          <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
