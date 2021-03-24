import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, StatusBar, Easing, Alert } from 'react-native'
import colors from '../config/colors'
import AppTextInput from '../components/AppTextInput'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AppButton from '../components/AppButton'
import AppLogo from '../components/AppLogo'
import AppLoading from 'expo-app-loading'
import { WithPushTransition } from 'react-native-simple-transition'
import * as Yup from 'yup'
import * as firebase from 'firebase'
//import LottieView from 'lottie-react-native'

import { AppForm, AppFormField, SubmitButton } from '../components/forms/index'
//import { signIn } from '../API/firebaseMethods'

import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
} from '@expo-google-fonts/dev';
import { useContext } from 'react'
import AuthContext from '../auth/context'
import ActivityIndicator from '../components/ActivityIndicator'

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
})

export default function LoginScreen({ navigation }) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [fieldValue, setFieldValue] = useState(false)
    const [loading, setLoading] = useState(false)
    //const authContext = useContext(AuthContext)
    //const [a, setA] = useState(0)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
    }, []);

    let size1 = 120;
    let size2 = 80;
    let [loaded] = useFonts({
        Nunito_400Regular,
        Lato_400Regular,
        Inter_900Black,
    })
    if(!loaded) {
        return <AppLoading />
    }
    

    const signIn = async ( values ) => {
        setLoading(true)
        try {
            await firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password);
            //navigation.replace('Home')
            //authContext.setUser(result)
            setFieldValue(true);
            setFieldValue(false);
            //Alert.alert("Success");
        } catch (err) {
            Alert.alert("Something wrong!", err.message);
            setFieldValue(true);
            setFieldValue(false);
        }
        setLoading(false)
    }

    const handleTextInput = () => {
        if(fieldValue) {
            return ""
        }
    }


    return (
        <>
            <WithPushTransition style={{ flex: 1 }} duration={5000} direction="up" easing= {Easing.bounce}>
                <View style={styles.logoContainer}>
                    <Text style={[styles.text, (!isKeyboardVisible) ? styles.sizeOfFont1 : styles.sizeOfFont2]}>Welcome To </Text>
                    <AppLogo font={(!isKeyboardVisible) ? 42 : 20} space={(!isKeyboardVisible) ? 3 : 1} />
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={[styles.loginContainer, (!isKeyboardVisible) ? styles.margin1 : styles.margin2 ]}>
                            <MaterialCommunityIcons name="account-circle" size={(!isKeyboardVisible) ? size1 : size2} color={colors.color11} style={styles.icon}/>
                            <AppForm
                                initialValues={({ email: "", password: ""})}
                                onSubmit={(values, actions) => 
                                    signIn(values).then(() => {
                                        actions.resetForm({
                                            values: {
                                                email: "",
                                                password: "",
                                            },
                                        })
                                    })
                                }
                                validationSchema={validationSchema}
                            >
                                <View style={styles.formContainer}>
                                    <AppFormField
                                        name="user-alt"
                                        title="email"
                                        placeholder="Email"
                                        autoCorrect={true}
                                        color={colors.white}
                                        onFocus={() => { setKeyboardVisible(true) }}
                                        onBlur={() => { setKeyboardVisible(false) }}
                                        value={handleTextInput()}
                                    />
                                    <AppFormField
                                        name="lock" 
                                        title="password"
                                        placeholder="Password" 
                                        autoCorrect={false}
                                        color={colors.white}
                                        onFocus={() => { setKeyboardVisible(true) }} 
                                        onBlur={() => { setKeyboardVisible(false) }}
                                        secureTextEntry={true}
                                        value={handleTextInput()}
                                    />
                                </View>
                                <SubmitButton
                                    title="login"
                                    fontFamily="Inter_900Black"
                                    loaderVisible={loading}
                                />
                            </AppForm>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </WithPushTransition>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.color15,
        padding: 15,
        /*borderWidth: 1,
        borderColor: 'black',*/
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 15,
        // backgroundColor: colors.color8,
    },
    loginContainer: {
        padding: 10,
        // marginTop: -90,
    },
    logoContainer: {
        backgroundColor: colors.color24,
        paddingTop: StatusBar.currentHeight,
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.color1,
        fontSize: 30,
        fontFamily: "Lato_400Regular",
    },
    margin1: {
        marginTop: -90,
    },
    margin2: {
        marginTop: -70,
    },
    sizeOfFont1: {
        fontSize: 22,
    },
    sizeOfFont2: {
        fontSize: 22,
    },
})
