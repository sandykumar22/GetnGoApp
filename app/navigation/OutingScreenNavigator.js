import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from '../screens/WelcomeScreen';
import colors from '../config/colors'
import HomeScreen from '../screens/HomeScreen';
import PendingOutingsScreen from '../screens/PendingOutingsScreen';
import OutingScreen from '../screens/OutingScreen';
import LocalOutingScreen from '../screens/LocalOutingScreen';
import NonLocalOutingScreen from '../screens/NonLocalOutingScreen';
import LocalEOutpass from '../screens/LocalEOutpass';
import NonLocalEOutPass from '../screens/NonLocalEOutPass';

const Stack = createStackNavigator();

const OutingScreenNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Outing"
            component={OutingScreen}
            options={{ headerShown: true, }}
        />
        <Stack.Screen 
            name="LocalOuting"
            component={LocalOutingScreen}
            options={{ headerShown: true, title: "Local outing" }}
        />
        <Stack.Screen 
            name="NonLocalOuting"
            component={NonLocalOutingScreen}
            options={{ headerShown: true, title: "Non local outing" }}
        />
        <Stack.Screen
            name="LocalEOutPass"
            component={LocalEOutpass}
            options={{ headerShown: true, title: "Local e-outpass" }}
        />
        <Stack.Screen
            name="NonLocalEOutPass"
            component={NonLocalEOutPass}
            options={{ headerShown: true, title: "Non Local e-outpass" }}
        />
    </Stack.Navigator>
)

export default OutingScreenNavigator;

