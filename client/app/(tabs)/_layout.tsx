import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthProvider, { AuthContext } from '../../contexts/AuthContext'; // <-- use correct relative path
import LoginScreen from '../../screens/LoginScreen';
import AdminDashboard from '../../screens/AdminDashboard';
import StudentDashboard from '../../screens/StudentDashboard';
import StudentProfile from '../../screens/StudentProfile';
import AttendanceScreen from '../../screens/AttendanceScreen';
import EventsScreen from '../../screens/EventsScreen';
import AddStudent from '../../screens/AddStudent';
import AddEvent from '../../screens/AddEvent';

const Stack = createNativeStackNavigator();

function RootStack() {
  const { userRole } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userRole ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : userRole === 'admin' ? (
        <>
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="AddStudent" component={AddStudent} />
          <Stack.Screen name="AddEvent" component={AddEvent} />
          <Stack.Screen name="Events" component={EventsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
          <Stack.Screen name="StudentProfile" component={StudentProfile} />
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <RootStack /> {/* <-- Remove NavigationContainer from here */}
    </AuthProvider>
  );
}