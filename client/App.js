// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import StudentDashboard from './screens/StudentDashboard';
import StudentProfile from './screens/StudentProfile';
import AttendanceScreen from './screens/AttendanceScreen';
import EventsScreen from './screens/EventsScreen';
import AddStudent from './screens/StudentForm';
import AddEvent from './screens/AddEvent';

const Stack = createNativeStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="AddStudent" component={AddStudent} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
      <Stack.Screen name="Events" component={EventsScreen} />
    </Stack.Navigator>
  );
}

function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="StudentProfile" component={StudentProfile} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <NavigationContainer>
      {!userRole ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setUserRole={setUserRole} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : userRole === 'admin' ? (
        <AdminStack />
      ) : (
        <StudentStack />
      )}
    </NavigationContainer>
  );
}
