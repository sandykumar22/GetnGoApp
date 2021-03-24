import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function ErrorDateTime({ error }) {
    return (
        <Text style={styles.error}>{error}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        textAlign: 'center',
        //marginLeft: 15,
        // marginVertical: -5,
    },
})
