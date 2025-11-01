import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import StudentDashboard from './screens/StudentDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userRole ? (
          // Login screen, pass setUserRole as prop
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setUserRole={setUserRole} />}
          </Stack.Screen>
        ) : userRole === 'admin' ? (
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        ) : (
          <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
