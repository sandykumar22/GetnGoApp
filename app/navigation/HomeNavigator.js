import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'
import OutingScreen from '../screens/OutingScreen'
import AppOutingButton from '../components/AppOutingButton';
import { View, StyleSheet, Text, Modal } from 'react-native'
import PendingOutingsScreen from '../screens/PendingOutingsScreen';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import HomeScreenNavigator from './HomeScreenNavigator'
import PendingScreenNavigator from './PendingScreenNavigator';
import OutingScreenNavigator from './OutingScreenNavigator'
import HistoryScreenNavigator from './HistoryScreenNavigator'
import AccountScreenNavigator from './AccountScreenNavigator';
import PendingOutingsNavigator from './PendingOutingsNavigator';


function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
  
    if (routeName === 'LocalOuting') {
      return false
    }
    else if(routeName === 'NonLocalOuting') {
        return false
    }
    else if(routeName === 'LocalEOutPass') {
        return false
    }
    else if(routeName === 'NonLocalEOutPass') {
        return false
    }
    return true
}

const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
            style: {backgroundColor: "white"},
            //activeBackgroundColor: "tomato",
            activeTintColor: "black",
            //inactiveBackgroundColor: "#eee",
            inactiveTintColor: "gray",
            showLabel: true,
        }}
    >
        <Tab.Screen 
            name="Home"
            component={HomeScreenNavigator}
            options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen 
            name="pending"
            component={PendingOutingsNavigator}
            options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialCommunityIcons name="more" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen 
            name="outing"
            component={OutingScreenNavigator}
            options={ ({ route, navigation }) => ({
                tabBarButton: () => <AppOutingButton tabBarVisible={getTabBarVisible(route)} onPress={() => navigation.navigate("outing")} />,
                tabBarVisible: getTabBarVisible(route),
            })}
            /*options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                ),
            }}*/
        />
        <Tab.Screen 
            name="History"
            component={HistoryScreenNavigator}
            options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialCommunityIcons name="history" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen 
            name="Account"
            component={AccountScreenNavigator}
            options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }}
        />
        
    </Tab.Navigator>
)

export default HomeNavigator;

/*
<Tab.Screen 
    name="Register" 
    component={RegisterScreen} 
    options={{ 
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: colors.color24,
        }
    }} 
/>
*/

const styles = StyleSheet.create({
    container: {},
})