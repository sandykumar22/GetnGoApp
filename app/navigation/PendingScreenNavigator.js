import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingOutingsScreen from '../screens/PendingOutingsScreen';
import AcceptedOutingsScreen from '../screens/AcceptedOutingsScreen'
import { View, Text, StatusBar as Stat } from 'react-native';
import PendingOutingsScreenNavigator from './PendingOutingsScreenNavigator';
import { StatusBar } from 'expo-status-bar'
import colors from '../config/colors';

const Tab = createMaterialTopTabNavigator();


const PendingScreenNavigator = () => {

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
                pending and accepted outings
            </Text>
            <StatusBar style="auto" backgroundColor="white" />
            <Tab.Navigator
                initialRouteName="PendingOutings"
                tabBarOptions={{
                    activeTintColor: '#e91e63',
                    labelStyle: { fontSize: 15 },
                    style: { 
                        backgroundColor: 'white',
                        //paddingTop: StatusBar.currentHeight,
                    },
                }}
            >
            <Tab.Screen
                name="PendingOutings"
                component={PendingOutingsScreen}
                options={{ 
                    tabBarLabel: 'Pendings',
                }}
            />
            <Tab.Screen
                name="AcceptedOutings"
                component={AcceptedOutingsScreen}
                options={{ 
                    tabBarLabel: 'Accepted'
                }}
            />
            </Tab.Navigator>
        </View>
    );
}

export default PendingScreenNavigator;
