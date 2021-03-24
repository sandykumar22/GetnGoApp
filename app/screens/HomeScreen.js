import React from 'react'
import { View, StyleSheet, Text, StatusBar, Button } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Screen from '../components/Screen';
import { NavigationContainer } from '@react-navigation/native';
import { loggingOut } from '../API/firebaseMethods'

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <Text> hello all this is home page... </Text>
            <Button title="sign out" onPress={loggingOut} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        flex: 1,
    },
})