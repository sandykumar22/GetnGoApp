import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

import colors from '../config/colors'
//import ActivityIndicator from '../components/ActivityIndicator'

export default function AppButton({ name, onPress, style, fontFamily, loaderVisible=false, }) {
    return (
        <View style={styles.container}>
            <TouchableRipple
                style={[styles.button, style]}
                borderless={true}
                onPress={onPress}>
                {loaderVisible 
                    ?
                    <ActivityIndicator size="large" color="white" />
                    : 
                    <Text style={[styles.buttonText, { fontFamily }]}>{name}</Text>
                }
            </TouchableRipple>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    button: {
        color: colors.dark,
        width: '100%',
        backgroundColor: colors.color11,
        alignSelf: 'center',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        elevation: 5,
        maxHeight: 65,
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
    },
})