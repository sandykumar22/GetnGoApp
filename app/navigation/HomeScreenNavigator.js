import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from '../screens/WelcomeScreen';
import colors from '../config/colors'
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{ headerShown: true, }}
        />
    </Stack.Navigator>
)

export default HomeScreenNavigator;

