import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
// import { BoxShadow } from "react-native-shadow"
import AppLoading from 'expo-app-loading'
import { TouchableRipple } from 'react-native-paper'
import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
  } from '@expo-google-fonts/dev';
import colors from '../config/colors'
export default function AppDateTimeInput({ name, size=24, color, onPress, ...otherProps }) {
    let [loaded] = useFonts({
        Nunito_400Regular
    })
    if(!loaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.field}
                    {...otherProps}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableRipple borderless={true} onPress={onPress} style={styles.iconContainer}>
                    {name && <FontAwesome5 name={name} size={size} color={color} style={styles.icon} />}
                </TouchableRipple>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    container: {
        flexDirection: 'row',
        width: '78%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.color11,
    },
    field: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
        width: '100%',
        height: '100%',
        color: colors.grey,
        padding: 15,
        fontFamily: "Nunito_400Regular",
    },
    icon: {
        color: 'white',
    },
    iconContainer: {
        backgroundColor: colors.color11,
        padding: 18,
        borderRadius: 5,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: colors.color11,
        borderRadius: 5,
        left: 5,
        elevation: 5,
        width: '20%',
    },
})