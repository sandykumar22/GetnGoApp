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
    place: Yup.string().required().min(1).max(50).label("Place of visit"),
    availability: Yup.string().required().nullable().label("Availability"),
    reason: Yup.string().required().min(1).max(150).label("Reason"),
})


export default function NonLocalOutingScreen( { navigation } ) {

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDate1, setShowDate1] = useState(false);
    const [showDate2, setShowDate2] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [displayDate1, setDisplayDate1] = useState(false)
    const [displayDate2, setDisplayDate2] = useState(false)
    const [displayTime, setDisplayTime] = useState(false)
    const [errorDate1, setErrorDate1] = useState(false)
    const [errorDate2, setErrorDate2] = useState(false)
    const [errorTime, setErrorTime] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fieldValue, setFieldValue] = useState(false)
    //const [ids, setIds] = useState([])
    let ids = []
    let finalData, finalUserData

    let currentDate1;
    let currentDate2;
    let currentTime;
    //const timeStamp = 0;
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
    
    const onChangeDate1 = (event, selectedValue) => {
        currentDate1 = selectedValue || date
        setShowDate1(Platform.OS === 'ios')
        //timeStamp = event.nativeEvent.timestamp
        setDate1(currentDate1)
        setDisplayDate1(true)
        setErrorDate1(false)
        //console.log(timeStamp)
        //console.log(formatDate(currentDate))
        //console.log(time.nativeEvent.timestamp)
    };
    const onChangeDate2 = (event, selectedValue) => {
        currentDate2 = selectedValue || date
        setShowDate2(Platform.OS === 'ios')
        //timeStamp = event.nativeEvent.timestamp;
        //const time = event;
        setDate2(currentDate2)
        setDisplayDate2(true)
        setErrorDate2(false)
        //console.log(currentdate2)
        //console.log(formatTime(currentdate2))
        //console.log(time.nativeEvent.timestamp)
    };
    const onChangeTime = (event, selectedValue) => {
        currentTime = selectedValue || date
        setShowTime(Platform.OS === 'ios')
        //timeStamp = event.nativeEvent.timestamp;
        //const time = event;
        setTime(currentTime)
        setDisplayTime(true)
        setErrorTime(false)
        //console.log(currentTime2)
        //console.log(formatTime(currentTime2))
        //console.log(time.nativeEvent.timestamp)
    };
    
    const showMode = (currentMode) => {
        if(currentMode==="date1") {
            setShowDate1(true)
            setMode('date');
        }
        else if(currentMode==="date2") {
            setShowDate2(true)
            setMode('date');
        }
        else if(currentMode==="time") {
            setShowTime(true)
            setMode('time');
        }
               
    };
    
    const showDate1picker = () => {
        showMode('date1');
    };
    
    const showDate2picker = () => {
        showMode('date2');
    };
    const showTimepicker = () => {
        showMode('time');
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

    const handleTextInput = () => {
        if(fieldValue) {
            return ""
        }
    }


    const handleSubmit = ( values, resetForm ) => {
        //console.log(values)
        if(!displayDate1) {
            setErrorDate1(true)
        }
        else if(!displayDate2) {
            setErrorDate2(true)
        }
        else if(!displayTime) {
            setErrorTime(true)
        }
        else {
            Alert.alert(
                "Are you sure",
                "please confirm to generate Nonlocal-eoutpass. press ok to confirm",
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

                            setErrorDate1(false)
                            setErrorDate2(false)
                            setErrorTime(false)
                            //Alert.alert("ok registered!")
                            values.inDate = formatDate(date1)
                            values.outDate = formatDate(date2)
                            values.outTime = formatTime(time)
                            values.timeStamp = uuid.v1()
                            //console.log(values)

                            /*setErrorDate(false)
                            setErrorTime1(false)
                            setErrorTime2(false)
                            //Alert.alert("ok registered!")
                            values.date = formatDate(date)
                            values.outTime = formatTime(time1)
                            values.inTime = formatTime(time2)
                            values.timeStamp = uuid.v1()*/
                            //console.log(values)
                            //return values
                            
                            //const res = await localOutingDetails(values)
                            //setLoading(false)
                            //return res
                            //navigation.navigate('LocalEOutPass')


                            try {
                                setLoading(true)
                                //await firebase.auth().createUserWithEmailAndPassword(email, password);
                                const currentUser = firebase.auth().currentUser
                        
                                const db = firebase.firestore()
                                db.collection("Non_Local_outings")
                                .doc(values.timeStamp)
                                .set({
                                    availability: values.availability,
                                    inDate: values.inDate,
                                    outDate: values.outDate,
                                    outTime: values.outTime,
                                    reason: values.reason,
                                    place: values.place,
                                    timeStamp: values.timeStamp,
                                    status: "pending",
                                    wentOut: false,
                                    cameIn: false,
                                    userId: currentUser.uid
                                }).then(() => {
                                    //console.log(eKey)
                                    //Alert.alert("Success!");
                                    setFieldValue(true);
                                    setFieldValue(false);
                                    setDisplayDate1(false)
                                    setDisplayDate2(false)
                                    setDisplayTime(false)
                                    const fd = firebase.database()
                                    let userData = fd.ref('users/' + currentUser.uid)
                                    userData.on('value', (snapshot) => {
                                        finalUserData = snapshot.val()
                                        finalData = {
                                            ...finalUserData,
                                            ...values,
                                        }
                                    })
                                        //const eKey = nonLocal.key
                                        //global.key = values.timeStamp
                                        setLoading(false)
                                        navigation.navigate('NonLocalEOutPass', finalData)
                                        
                                    
                                    //console.log(finalData)
                                    //setLoading(false)
                                    //window.flag = 1
                                    //setFlag(true)
                                    //ids.push(values.timeStamp)
                                    //console.log(ids)
                                    resetForm()
                                })
                            }
                            catch (err) {
                                //setLoading(true)
                                Alert.alert("Something wrong!", err.message);
                                setFieldValue(true);
                                setFieldValue(false);
                                setDisplayDate1(false)
                                setDisplayDate2(false)
                                setDisplayTime(false)
                                setLoading(false)
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
            
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Fill the form below</Text>
                <View style={styles.formContainer}>
                    <View style={styles.formHeader}>
                        <Text style={styles.formHeaderText}>Non local e-outpass form</Text>
                    </View>
                    <AppFormDateTime title="indate" name="calendar" value={displayDate1 ? formatDate(date1) : ""} onPress={showDate1picker} placeholder="Out date" />
                    {errorDate1 && <ErrorDateTime error="please select a valid out date" />}
                    <AppFormDateTime title="outdate" name="calendar" value={displayDate2 ? formatDate(date2) : ""} onPress={showDate2picker} placeholder="In date" />
                    {errorDate2 && <ErrorDateTime error="please select a valid in date" />}
                    <AppFormDateTime title="outtime" name="hourglass-start" value={displayTime ? formatTime(time) : ""} onPress={showTimepicker} placeholder="Out time" />
                    {errorTime && <ErrorDateTime error="please select a valid out time" />}
                    {showDate1 && (
                        <DateTimePicker
                            testID="dateTimePicker1"
                            value={date1}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate1}
                        />
                    )}
                    {showDate2 && (
                        <DateTimePicker
                            testID="dateTimePicker2"
                            value={date2}
                            mode={mode}
                            is24Hour={false}
                            display="default"
                            onChange={onChangeDate2}
                        />
                    )}
                    {showTime && (
                        <DateTimePicker
                            testID="dateTimePicker3"
                            value={time}
                            mode={mode}
                            is24Hour={false}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}
                    <View style={styles.formContent}>
                        <AppForm
                            initialValues={({ availability: null, reason: "", place: "" })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleSubmit(values, resetForm)
                                //console.log(result)
                                /*if(flag) {
                                    resetForm()
                                    //navigation.navigate('LocalEOutPass', values)
                                }*/
                            }}
                            validationSchema={validationSchema}
                        >
                                <AppFormField
                                    name="map-marker-alt"
                                    title="place"
                                    placeholder="Place of visit"
                                    color={colors.white}
                                    value={handleTextInput()}
                                />
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