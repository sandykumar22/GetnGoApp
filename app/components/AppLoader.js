import React from 'react'
import { View, StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'

export default function AppLoader({ visible }) {

    if(visible) {
        return (
            <AppLoading />
        )
    }
}

const styles = StyleSheet.create({
    container: {},
})