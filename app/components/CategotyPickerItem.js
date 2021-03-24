import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import colors from '../config/colors'
import AppText from './AppText'
import Icon from './Icon'

export default function CategoryPickerItem({ item, onPress }) {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.container}>
                <AppText title={item.label} style={styles.text} />
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container: {
       padding: 20,
    },
    text: {
        color: "black",
        textAlign: 'center',
    },
})
