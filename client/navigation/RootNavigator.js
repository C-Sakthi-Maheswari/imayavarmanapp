// navigation/RootNavigator.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import AdminDashboard from '../screens/AdminDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import AddStudent from '../screens/AddStudent';
import AddEventScreen from '../screens/AddEventScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentProfile from '../screens/StudentProfile';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : user.role === 'admin' ? (
          <>
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="AddStudent" component={AddStudent} />
            <Stack.Screen name="AddEvent" component={AddEventScreen} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
            <Stack.Screen name="StudentProfile" component={StudentProfile} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
