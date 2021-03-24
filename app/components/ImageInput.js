import React, { useEffect } from 'react'
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import colors from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default function ImageInput({ imageUri, onChangeImage }) {

    useEffect(() => {
        requestPermission();
    }, [])

    const requestPermission = async () => {
        const { granted } = await(Permissions.askAsync(Permissions.MEDIA_LIBRARY));
        //const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted) alert("You need to enable the permissions to access the library!");
    }
    
    const onPressHandler = () => {
        if(!imageUri) selectImage();
        else Alert.alert("Delete", "Are you sure want to delete this image?", [
            { text: "Yes", onPress: () => { onChangeImage(null) }},
            { text: "No", }
        ])
    }

    const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.5,
          });
          if(!result.cancelled) onChangeImage(result.uri)
        } catch (error) {
          console.log('Error reading the image', error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPressHandler}>
            <View style={styles.container}>
                {!imageUri && <MaterialCommunityIcons name="camera" size={40} color={colors.white} />}
                {imageUri && <Image source={{ uri: imageUri}} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color11,
        width: 120,
        height: 120,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})
