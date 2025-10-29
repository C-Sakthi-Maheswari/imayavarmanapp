// client/navigation/RootNavigator.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';

import AdminDashboard from '../screens/AdminDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentList from '../screens/StudentList';
import StudentForm from '../screens/StudentForm';
import StudentProfile from '../screens/StudentProfile';
import EventsScreen from '../screens/EventsScreen';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or a loader

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : user.role === 'admin' ? (
        <>
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{ title: 'Admin Dashboard', headerLeft: null }}
          />
          <Stack.Screen
            name="StudentList"
            component={StudentList}
            options={{ title: 'Manage Students' }}
          />
          <Stack.Screen
            name="StudentForm"
            component={StudentForm}
            options={{ title: 'Add / Edit Student' }}
          />
          <Stack.Screen
            name="AttendanceScreen"
            component={AttendanceScreen}
            options={{ title: 'Mark Attendance' }}
          />
          <Stack.Screen
            name="EventsScreen"
            component={EventsScreen}
            options={{ title: 'Events' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="StudentDashboard"
            component={StudentDashboard}
            options={{ title: 'Student Dashboard', headerLeft: null }}
          />
          <Stack.Screen
            name="StudentProfile"
            component={StudentProfile}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen
            name="AttendanceScreen"
            component={AttendanceScreen}
            options={{ title: 'Attendance' }}
          />
          <Stack.Screen
            name="EventsScreen"
            component={EventsScreen}
            options={{ title: 'Events' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
