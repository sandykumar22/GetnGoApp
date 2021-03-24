import React, { useRef }from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ImageInput from './ImageInput'
import AppLoading from 'expo-app-loading'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
} from '@expo-google-fonts/dev';
import colors from '../config/colors';

export default function ImageInputList({ imageUris=[], onRemoveImage, onAddImage }) {

    let [loaded] = useFonts({
        Nunito_400Regular,
        Lato_400Regular,
        Inter_900Black,
    })
    if(!loaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                {imageUris[0] && <View key={imageUris[0]} style={styles.image}>
                    <ImageInput imageUri={imageUris[0]} onChangeImage={(imageUri) => onRemoveImage(imageUri)} />
                </View>}
                {!imageUris[0] && <ImageInput onChangeImage={(imageUri) => onAddImage(imageUri)} />}
            </View>
            <Text style={styles.text}>{imageUris[0] ? <MaterialCommunityIcons name="checkbox-marked-circle" size={28} color={colors.color11} /> : "upload your image"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: "row",
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Nunito_400Regular',
        color: colors.medium,
    },
})