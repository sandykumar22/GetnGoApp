import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StatusBar as Stat } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import colors from '../config/colors';
import PendingScreen from '../screens/PendingScreen';
import AcceptedScreen from '../screens/AcceptedScreen';

const Tab = createMaterialTopTabNavigator()


const PendingOutingsNavigator = () => {

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
                name="PendingOutings"
                component={PendingScreen}
                options={{ 
                    tabBarLabel: 'Pendings',
                }}
            />
            <Tab.Screen
                name="AcceptedOutings"
                component={AcceptedScreen}
                options={{ 
                    tabBarLabel: 'Accepted'
                }}
            />
            </Tab.Navigator>
        </View>
    );
}

export default PendingOutingsNavigator;
