import React from 'react'
import { Text, StyleSheet } from 'react-native'

import colors from '../config/colors'

export default function AppText({ title, color="primary", style, ...otherProps }) {
    return (
    <Text style={[styles.text, style]} {...otherProps}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        //fontFamily: Platform.OS == "android" ? "Roboto" : "Avenir",
        color: colors.black,
    },
});