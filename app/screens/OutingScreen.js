import React from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LocalOutingScreen from './LocalOutingScreen'
import NonLocalOutingScreen from './NonLocalOutingScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
} from '@expo-google-fonts/dev';
import AppButton from '../components/AppButton';
import AppLoading from 'expo-app-loading';

export default function OutingScreen({ navigation }) {

    let [loaded] = useFonts({
        Nunito_400Regular,
        Lato_400Regular,
        Inter_900Black,
    })
    if(!loaded) {
        return <AppLoading />
    }    
    //const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Generate e-outpass</Text>
            <View style={styles.mainLocal}>
                <TouchableRipple 
                    style={styles.local}
                    borderless={true}
                    onPress={() => navigation.navigate("LocalOuting")}
                >
                    <View style={styles.subMainLocal}>
                        <Text style={styles.text}>Local outing</Text>
                        <MaterialCommunityIcons style={styles.icon} name="chevron-double-right" size={35} color={"white"} />
                    </View>
                </TouchableRipple>
            </View>
            <View style={styles.mainNonLocal}>
                <TouchableRipple 
                    style={styles.nonlocal}
                    borderless={true}
                    onPress={() => navigation.navigate("NonLocalOuting")}
                >
                    <View style={styles.subMainNonLocal}>
                        <Text style={styles.text}>Non local outing</Text>
                        <MaterialCommunityIcons style={styles.icon} name="chevron-double-right" size={35} color={"white"} />
                    </View>
                </TouchableRipple>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        flex: 1,
    },
    mainLocal: {
        width: '90%',
    },
    local: {
        padding: 20,
        backgroundColor: "skyblue",
        borderRadius: 60,
        marginBottom: 30,
        alignItems: 'center',
        elevation: 8,
    },
    mainNonLocal: {
        width: '90%',
    },
    nonlocal: {
        padding: 20,
        backgroundColor: "skyblue",
        borderRadius: 60,
        alignItems: 'center',
        elevation: 8,
    },
    subMainLocal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    subMainNonLocal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 22,
        marginRight: 10,
        fontFamily: "Nunito_400Regular",
        color: 'white',
    },
    icon: {
        marginVertical: 0,
    },
    header: {
        bottom: 60,
        fontSize: 24,
        fontFamily: "Lato_400Regular",
    },
    subContainer: {},
})