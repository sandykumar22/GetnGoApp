import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from '../screens/WelcomeScreen';
import colors from '../config/colors'
import HomeScreen from '../screens/HomeScreen';
import PendingOutingsScreen from '../screens/PendingOutingsScreen';
import AcceptedOutingsScreen from '../screens/AcceptedOutingsScreen'

const Stack = createStackNavigator();

const PendingOutingsScreenNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="pendings"
            component={PendingOutingsScreen}
            options={{ headerShown: true, }}
        />
        <Stack.Screen 
            name="accepted"
            component={AcceptedOutingsScreen}
            options={{ headerShown: true, }}
        />
    </Stack.Navigator>
)

export default PendingOutingsScreenNavigator;

