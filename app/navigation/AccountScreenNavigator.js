import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

const AccountScreenNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Account"
            component={AccountScreen}
            options={{ headerShown: true, }}
        />
    </Stack.Navigator>
)

export default AccountScreenNavigator;

