import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/LoginScreen';
import AdminDashboard from '../../screens/AdminDashboard';
import StudentDashboard from '../../screens/StudentDashboard';
import StudentProfile from '../../screens/StudentProfile';
import AttendanceScreen from '../../screens/AttendanceScreen';
import EventsScreen from '../../screens/EventsScreen';
import AddStudent from '../../screens/AddStudent';
import AddEvent from '../../screens/AddEvent';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Login Screen */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Admin Screens */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="AddStudent" component={AddStudent} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
      
      {/* Student Screens */}
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="StudentProfile" component={StudentProfile} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      
      {/* Shared Screens */}
      <Stack.Screen name="Events" component={EventsScreen} />
    </Stack.Navigator>
  );
}