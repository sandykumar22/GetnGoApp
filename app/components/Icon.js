import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Icon({ 
    name, 
    size=40, 
    iconColor="#fff",
    backgroundColor="#000", 
    }) {
    return (
        <View style={{  
                width: size,
                height: size,
                borderRadius: size * 0.5,
                backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <MaterialCommunityIcons 
                name={name}
                size={size * 0.5}
                color={iconColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})