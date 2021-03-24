import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableRipple } from 'react-native-paper'

export default function AppOutingButton({ onPress, tabBarVisible }) {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View style={[styles.container, {bottom: tabBarVisible ? 30 : 0}]}>
                <MaterialCommunityIcons name="plus" size={34} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        bottom: 30,
        borderColor: "white",
        borderWidth: 5,
    },
})