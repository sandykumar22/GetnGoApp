import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../config/colors'
import AppText from './AppText'

export default function PickerItem({ item, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText title={item.label} style={styles.text}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 15,
        color: colors.dark,
    },
})