import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Platform, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import uuid from 'uuid'
import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
  } from '@expo-google-fonts/dev';
import AppLoading from 'expo-app-loading';
import * as firebase from 'firebase'

import { AppForm, AppFormField, SubmitButton } from '../components/forms/index'
import * as Yup from 'yup'
import colors from '../config/colors'
import AppFormDateTime from '../components/forms/AppFormDateTime';
import AppFormPicker from '../components/forms/AppFormPicker'
import CategoryPickerItem from '../components/CategotyPickerItem';
import ErrorDateTime from '../components/ErrorDateTime';

const validationSchema = Yup.object().shape({
    availability: Yup.string().required().nullable().label("Availability"),
    reason: Yup.string().required().min(1).max(150).label("Reason"),
})



export default function LocalOutingScreen( { navigation }) {

    const [date, setDate] = useState(new Date());
    const [time1, setTime1] = useState(new Date());
    const [time2, setTime2] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDate, setShowDate] = useState(false);
    const [showTime1, setShowTime1] = useState(false);
    const [showTime2, setShowTime2] = useState(false);
    const [displayDate, setDisplayDate] = useState(false)
    const [displayTime1, setDisplayTime1] = useState(false)
    const [displayTime2, setDisplayTime2] = useState(false)
    const [errorDate, setErrorDate] = useState(false)
    const [errorTime1, setErrorTime1] = useState(false)
    const [errorTime2, setErrorTime2] = useState(false)
    const [fieldValue, setFieldValue] = useState(false)
    const [loading, setLoading] = useState(false)
    //const [flag, setFlag] = useState(false)

    let currentDate;
    let currentTime1;
    let currentTime2;
    //console.log(time)
    let [loaded] = useFonts({
        Nunito_400Regular,
        Lato_400Regular,
        Inter_900Black,
    })
    if(!loaded) {
        return <AppLoading />
    }

    const formatDate = (date) => {
        const finalDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return finalDate
    };
    const formatTime = (time) => {
        var amOrPm = (time.getHours() < 12) ? "AM" : "PM";
        var hour = (time.getHours() < 12) ? time.getHours() : time.getHours() - 12;
        const finalTime = hour + ':' + time.getMinutes() + ' ' + amOrPm
        return finalTime
    }
    
    const onChangeDate = (event, selectedValue) => {
        currentDate = selectedValue || date
        setShowDate(Platform.OS === 'ios')
        //const timeStamp = event.nativeEvent.timestamp;
        setDate(currentDate)
        setDisplayDate(true)
        setErrorDate(false)
        //console.log(timeStamp)
        //console.log(formatDate(currentDate))
        //console.log(time.nativeEvent.timestamp)
    };
    const onChangeTime1 = (event, selectedValue) => {
        currentTime1 = selectedValue || date
        setShowTime1(Platform.OS === 'ios')
        //const time = event;
        setTime1(currentTime1)
        setDisplayTime1(true)
        setErrorTime1(false)
        //console.log(currentTime1)
        //console.log(formatTime(currentTime1))
        //console.log(time.nativeEvent.timestamp)
    };
    const onChangeTime2 = (event, selectedValue) => {
        currentTime2 = selectedValue || date
        setShowTime2(Platform.OS === 'ios')
        //const time = event;
        setTime2(currentTime2)
        setDisplayTime2(true)
        setErrorTime2(false)
        //console.log(currentTime2)
        //console.log(formatTime(currentTime2))
        //console.log(time.nativeEvent.timestamp)
    };
    
    const showMode = (currentMode) => {
        if(currentMode==="date") {
            setShowDate(true)
            setMode('date');
        }
        else if(currentMode==="time1") {
            setShowTime1(true)
            setMode('time');
        }
        else if(currentMode==="time2") {
            setShowTime2(true)
            setMode('time');
        }
               
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTime1picker = () => {
        showMode('time1');
    };
    const showTime2picker = () => {
        showMode('time2');
    };

    const availability = [
        {
            label: "Breakfast",
            value: "breakfast",
        },
        {
            label: "Lunch",
            value: "lunch",
        },
        {
            label: "Dinner",
            value: "dinner",
        },
    ]


    /*const localOutingDetails = async ( values ) => {
        //setLoading(true)
        try {
            //await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentUser = firebase.auth().currentUser;
    
            const db = firebase.database();
            db.ref('users/' + currentUser.uid + '/Local_outings/' + values.timeStamp)
            .set({
                availability: values.availability,
                date: values.date,
                inTime: values.inTime,
                outTime: values.outTime,
                reason: values.reason,
                timeStamp: values.timeStamp,
            });
            //Alert.alert("Success!");
            setFieldValue(true);
            setFieldValue(false);
            setDisplayDate(false)
            setDisplayTime1(false)
            setDisplayTime2(false)
            //setLoading(false)
            return 1
        } 
        catch (err) {
            //setLoading(true)
            Alert.alert("Something wrong!", err.message);
            setFieldValue(true);
            setFieldValue(false);
            setDisplayDate(false)
            setDisplayTime1(false)
            setDisplayTime2(false)
            //setLoading(false)
            return 0
            //return err;
        }
    }*/

    const handleTextInput = () => {
        if(fieldValue) {
            return ""
        }
    }
    const handleSubmitAction = ( values, resetForm ) => {
        //let flag = 0
        if(!displayDate) {
            setErrorDate(true)
            //window.flag = 0
        }
        else if(!displayTime1) {
            setErrorTime1(true)
            //window.flag = 0
        }
        else if(!displayTime2) {
            setErrorTime2(true)
            //window.flag = 0
        }
        else {
            Alert.alert(
                "Are you sure",
                "please confirm to generate local-eoutpass. press ok to confirm",
                [
                    {
                        text: "Cancel",
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: "confirm",
                        onPress: () => {
                            //flag = 1
                            //setFieldValue(true);

                            setErrorDate(false)
                            setErrorTime1(false)
                            setErrorTime2(false)
                            //Alert.alert("ok registered!")
                            values.date = formatDate(date)
                            values.outTime = formatTime(time1)
                            values.inTime = formatTime(time2)
                            values.timeStamp = uuid.v1()
                            //console.log(values)
                            //return values
                            
                            //const res = await localOutingDetails(values)
                            //setLoading(false)
                            //return res
                            //navigation.navigate('LocalEOutPass')
                            try {
                                setLoading(true)
                                //await firebase.auth().createUserWithEmailAndPassword(email, password);
                                const currentUser = firebase.auth().currentUser;
                                const db = firebase.database()
                                const fs = firebase.firestore()
                                fs.collection("Local_outings")
                                .doc(values.timeStamp)
                                .set({
                                    availability: values.availability,
                                    date: values.date,
                                    inTime: values.inTime,
                                    outTime: values.outTime,
                                    reason: values.reason,
                                    timeStamp: values.timeStamp,
                                    status: "accepted",
                                    wentOut: false,
                                    cameIn: false,
                                    userId: currentUser.uid
                                }).then(() => {
                                    //Alert.alert("Success!");
                                    setFieldValue(true);
                                    setFieldValue(false);
                                    setDisplayDate(false)
                                    setDisplayTime1(false)
                                    setDisplayTime2(false)
                                    let userData = db.ref('users/' + currentUser.uid)
                                    userData.on('value', (snapshot) => {
                                        var finalUserData = snapshot.val()
                                        const finalData = {
                                            ...finalUserData,
                                            ...values,
                                        }
                                        setLoading(false)
                                        navigation.navigate('LocalEOutPass', finalData)
                                        
                                    })
                                    //console.log(finalData)
                                    //setLoading(false)
                                    //window.flag = 1
                                    //setFlag(true)
                                    resetForm()
                                })
                            }
                            catch (err) {
                                //setLoading(true)
                                Alert.alert("Something wrong!", err.message);
                                setFieldValue(true);
                                setFieldValue(false);
                                setDisplayDate(false)
                                setDisplayTime1(false)
                                setDisplayTime2(false)
                                //setLoading(false)
                                //return err;
                            }
                            //setFieldValue(false);
                            //return flag
                            //setFlag(true)
                        },
                    },
                ],
            )
            //flag = 1
            
        }
        //setLoading(false)
        //return flag
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Fill the form below</Text>
                <View style={styles.formContainer}>
                    <View style={styles.formHeader}>
                        <Text style={styles.formHeaderText}>Local e-outpass form</Text>
                    </View>
                    <AppFormDateTime title="date" name="calendar" value={displayDate ? formatDate(date) : ""} onPress={showDatepicker} placeholder="Date" />
                    {errorDate && <ErrorDateTime error="please select a valid date" />}
                    <AppFormDateTime title="intime" name="hourglass-start" value={displayTime1 ? formatTime(time1) : ""} onPress={showTime1picker} placeholder="Out time" />
                    {errorTime1 && <ErrorDateTime error="please select a valid out time" />}
                    <AppFormDateTime title="outtime" name="hourglass-end" value={displayTime2 ? formatTime(time2) : ""} onPress={showTime2picker} placeholder="In time" />
                    {errorTime2 && <ErrorDateTime error="please select a valid in time" />}
                    {showDate && (
                        <DateTimePicker
                            testID="dateTimePicker1"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                    {showTime1 && (
                        <DateTimePicker
                            testID="dateTimePicker2"
                            value={time1}
                            mode={mode}
                            is24Hour={false}
                            display="default"
                            onChange={onChangeTime1}
                        />
                    )}
                    {showTime2 && (
                        <DateTimePicker
                            testID="dateTimePicker3"
                            value={time2}
                            mode={mode}
                            is24Hour={false}
                            display="default"
                            onChange={onChangeTime2}
                        />
                    )}
                    <View style={styles.formContent}>
                        <AppForm
                            initialValues={({ availability: null, reason: "" })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleSubmitAction(values, resetForm)
                                //console.log(result)
                                /*if(flag) {
                                    resetForm()
                                    //navigation.navigate('LocalEOutPass', values)
                                }*/
                            }}
                            validationSchema={validationSchema}
                        >
                            <View style={styles.appForm}>
                                <AppFormPicker
                                    name="availability"
                                    items={availability}
                                    placeholder="Select availability"
                                    icon="code-branch"
                                    width="50%"
                                    PickerItemComponent={CategoryPickerItem}
                                    value={handleTextInput()}
                                />
                                <AppFormField
                                    //name="user-circle"
                                    title="reason"
                                    placeholder="Reason"
                                    color={colors.white}
                                    multiline
                                    numberOfLines={3}
                                    value={handleTextInput()}
                                />                                
                            </View>
                            <SubmitButton
                                title="Generate e-outpass"
                                fontFamily="Inter_900Black"
                                loaderVisible={loading}
                            />
                        </AppForm>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
        overflow: "hidden",
        alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        padding: 10,
        top: 10,
        fontSize: 24,
        fontFamily: 'Lato_400Regular',
    },
    formContainer: {
        // backgroundColor: "white",
        width: "90%",
        marginVertical: 20,
        //borderColor: "white",
        //borderWidth: 1,
        elevation: 0,
        padding: 20,
        paddingTop: 30,
    },
    formHeaderText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
    },
})