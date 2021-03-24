import React from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'

export default function PendingOutingsScreen() {
    return (
        <View style={styles.container}>
            <Text>Pending Outings Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        flex: 1,
    },
})