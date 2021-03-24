import React from 'react'
import { View,  StatusBar as Stat, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar'

import colors from '../config/colors'
import LocalHistoryScreen from '../screens/LocalHistoryScreen'
import NonLocalHistoryScreen from '../screens/NonLocalHistoryScreen';

const Tab = createMaterialTopTabNavigator()

const HistoryScreenNavigator = () => {

    return (
        <View style={{ 
            flex: 1, 
            paddingTop: Stat.currentHeight,
        }}>
            <Text style={{ 
                color: '#000', 
                padding: 20, 
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: colors.backColor,
            }}>
                History
            </Text>
            <StatusBar style="auto" backgroundColor="white" />
            <Tab.Navigator
                initialRouteName="PendingOutings"
                tabBarOptions={{
                    activeTintColor: 'black',
                    labelStyle: { 
                        fontSize: 15,
                        textTransform: 'capitalize',
                    },
                    style: { 
                        backgroundColor: 'white',
                        //paddingTop: StatusBar.currentHeight,
                    },
                }}
            >
            <Tab.Screen
                name="LocalHistory"
                component={LocalHistoryScreen}
                options={{ 
                    tabBarLabel: 'Local',
                }}
            />
            <Tab.Screen
                name="NonLocalHistory"
                component={NonLocalHistoryScreen}
                options={{ 
                    tabBarLabel: 'NonLocal',
                }}
            />
            </Tab.Navigator>
        </View>
    )
}

export default HistoryScreenNavigator;