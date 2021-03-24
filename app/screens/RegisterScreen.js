import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView, Alert } from 'react-native'
import colors from '../config/colors'
import AppLoading from 'expo-app-loading'
import * as Yup from 'yup'
//import { registration } from '../API/firebaseMethods'
import { useFormikContext } from 'formik'
import * as firebase from "firebase";
//import "firebase/firestore";

import { AppForm, AppFormField, SubmitButton, AppFormPicker, FormImagePicker } from '../components/forms/index'
import AppLoader from '../components/AppLoader'

import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
} from '@expo-google-fonts/dev';
import CategoryPickerItem from '../components/CategotyPickerItem'

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(2).max(50).label("Name"),
    regd: Yup.string().required().min(6).max(6).label("Regd no"),
    rollno: Yup.string().required().min(6).max(6).label("Roll no"),
    fathername: Yup.string().required().label("Father name"),
    mothername: Yup.string().required().label("Mother name"),
    email: Yup.string().required().email().label("Email"),
    year: Yup.string().required().nullable().label("Year"),
    branch: Yup.string().required().nullable().label("Branch"),
    home: Yup.string().required().label("Home address"),
    password: Yup.string().required().min(4).label("Password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label("confirm password"),
    sphone: Yup.string().required().min(10).max(10).label("Student phone no"),
    pphone: Yup.string().required().min(10).max(10).label("Parent phone no"),
    images: Yup.array().min(1, "please select a valid image").max(1),
})

export default function RegisterScreen( { navigation } ) {
    const [fieldValue, setFieldValue] = useState(false)
    const [loading, setLoading] = useState(false)
    let [loaded] = useFonts({
        Nunito_400Regular,
        Lato_400Regular,
        Inter_900Black,
    })
    //const { resetForm } = useFormikContext()
    if(!loaded) {
        return <AppLoading />
    }
    const years = [
        {
            label: "First year",
            value: 1,
        },
        {
            label: "Second year",
            value: 2,
        },
        {
            label: "Third year",
            value: 3,
        },
        {
            label: "Fourth year",
            value: 4,
        },
    ]
    const branches = [
        {
            label: "Computer Science and Engineering (CSE)",
            value: "CSE",
        },
        {
            label: "Electronics and Communication Engineering (ECE)",
            value: "ECE",
        },
        {
            label: "Electrical and Electronics Engineering (EEE)",
            value: "EEE",
        },
        {
            label: "Mechanical Engineering (ME)",
            value: "ME",
        },
        {
            label: "Civil Engineering (CE)",
            value: "CE",
        },
        {
            label: "Materials and Metallurgical Engineering (MME)",
            value: "MME",
        },
        {
            label: "Bio Technology (BT)",
            value: "BT",
        },
        {
            label: "Chemical Engineering (CHE)",
            value: "CHE",
        },
    ]

    


    const registration = async ( values ) => {
        setLoading(true)
        try {
            await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
            const currentUser = firebase.auth().currentUser;
    
            const db = firebase.database();
            db.ref('users/' + currentUser.uid)
            .set({
                email: currentUser.email,
                name: values.name,
                regd: values.regd,
                rollno: values.rollno,
                fathername: values.fathername,
                mothername: values.mothername,
                year: values.year,
                branch: values.branch,
                home: values.home,
                //password: values.password,
                sphone: values.sphone,
                pphone: values.pphone,
                images: values.images[0],
            })
            /*Alert.alert(
                "Success", 
                "You have successfully registered to GetnGo. please click ok to redirect to login",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            setFieldValue(true);
                            setFieldValue(false);
                        },
                    },
                    {
                        text: "ok",
                        onPress: () => {
                            setFieldValue(true);
                            navigation.navigate('Login')
                            setFieldValue(false);
                        },
                    },
                ],
            )*/
        } 
        catch (err) {
            Alert.alert(
                "Something wrong!", 
                err.message,
                [
                    {
                        text: "try again",
                        onPress: () => {
                            setFieldValue(true);
                            setFieldValue(false);
                        },
                    },
                ],
            );
        }
        setLoading(false)
    }
    

    const handleTextInput = () => {
        if(fieldValue) {
            return ""
        }
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.textLogo}>GetnGo</Text>
                    <View style={styles.loginContainer}>
                        <AppForm
                            initialValues={({ images: [], name: "", regd: "", rollno: "", fathername: "", mothername: "", email: "", year: null, branch: null, home: "", password: "", confirmPassword: "", sphone: "", pphone: "",})}
                            onSubmit={(values, actions) => 
                                {
                                    registration(values).then(() => {
                                        actions.resetForm({
                                            values: {
                                                images: [],
                                                name: "",
                                                regd: "",
                                                rollno: "",
                                                fathername: "",
                                                mothername: "",
                                                email: "",
                                                year: null,
                                                branch: null,
                                                home: "",
                                                password: "",
                                                confirmPassword: "",
                                                sphone: "",
                                                pphone: "",
                                            },
                                        })
                                    })
                                }
                            }
                            validationSchema={validationSchema}
                        >
                            <FormImagePicker name="images" />
                            <View style={styles.formContainer}>
                                <AppFormField
                                    name="user-alt" 
                                    title="name"
                                    placeholder="Full name"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="user-circle" 
                                    title="regd"
                                    placeholder="Regd no" 
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="user"
                                    title="rollno"
                                    placeholder="Roll no"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="male"
                                    title="fathername"
                                    placeholder="Father name"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="female"
                                    title="mothername"
                                    placeholder="Mother name"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="at"
                                    title="email"
                                    placeholder="Email"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormPicker
                                    name="year"
                                    items={years}
                                    placeholder="Select year"
                                    icon="graduation-cap"
                                    width="50%"
                                    PickerItemComponent={CategoryPickerItem}
                                />
                                <AppFormPicker
                                    name="branch"
                                    items={branches}
                                    placeholder="Select branch"
                                    icon="code-branch"
                                    width="50%"
                                    PickerItemComponent={CategoryPickerItem}
                                />
                                <AppFormField
                                    name="home"
                                    title="home"
                                    placeholder="Your home address"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="lock" 
                                    title="password"
                                    placeholder="Password" 
                                    autoCorrect={false}
                                    color={colors.white} 
                                    secureTextEntry={true}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="lock" 
                                    title="confirmPassword"
                                    placeholder="Confirm Password" 
                                    autoCorrect={false}
                                    color={colors.white} 
                                    secureTextEntry={true}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="phone"
                                    title="sphone"
                                    placeholder="Student phone no"
                                    autoCorrect={false}
                                    color={colors.white}
                                    keyboardType="numeric"
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    name="phone-alt"
                                    title="pphone"
                                    placeholder="Parent phone no"
                                    autoCorrect={false}
                                    color={colors.white}
                                    keyboardType="numeric"
                                    value={handleTextInput()}
                                />
                            </View>
                            <SubmitButton
                                title="Register"
                                fontFamily="Inter_900Black"
                                loaderVisible={loading}
                            />
                        </AppForm>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.color15,
        padding: 15,
        paddingTop: 4,
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
        paddingTop: 0,
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
    textLogo: {
        textAlign: 'center',
        fontFamily: "Inter_900Black",
        color: colors.color1,
        fontSize: 40,
        marginTop: 10,
    },
})
