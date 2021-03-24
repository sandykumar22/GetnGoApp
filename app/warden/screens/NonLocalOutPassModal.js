import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, ScrollView, Text, Button, Alert } from 'react-native'
import OutpassText from '../components/OutpassText'

export default function NonLocalOutPassModal( values ) {
    //const [loading, setLoading] = useState(false)
    //const [finalData, setFinalData] = useState({})
    const finalData = values.values
    //console.log(finalData)
    //let finalData = {}
    //console.log(values)
    //let finalUserData;
    /*const currentUser = firebase.auth().currentUser
    const db = firebase.database()
    let userData = db.ref('users/' + currentUser.uid)
    userData.on('value', (snapshot) => {
        var finalUserData = snapshot.val()
        finalData = {
            ...finalUserData,
            ...values,
        }
    })
    console.log(finalData)*/

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo_nitandhra.png')} style={styles.logo} />
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>NATIONAL INSTITUTE OF TECHNOLOGY</Text>
                        <Text style={styles.address}>Near National Highway No. 16, Kondruprolu, Tadepalligudem-534101,</Text>
                        <Text style={styles.cllg}>WEST GODAVARI DIST., ANDHRA PRADESH, INDIA</Text>
                    </View>
                </View>
                <View style={styles.passContainer}>
                    <View style={styles.outpassImageContainer}>
                        <Image source={{
                            uri: finalData.images
                        }} 
                        style={styles.stdimage} 
                        />
                    </View>
                    <Text style={styles.localText}>Non Local e-outpass</Text>
                    <View style={styles.detailsContainer}>
                        <OutpassText placeholder="Name" value={finalData.name} width="17%" length="55%" />
                        <OutpassText placeholder="Regd.no" value={finalData.regd} width="21%" length="55%" />
                        <OutpassText placeholder="Roll no" value={finalData.rollno} width="19%" />
                        <OutpassText placeholder="Email" value={finalData.email} width="16%" />
                        <OutpassText placeholder="Year" value={finalData.year} width="14%" />
                        <OutpassText placeholder="Branch" value={finalData.branch} width="19%" />
                        <OutpassText placeholder="Student phone" value={finalData.sphone} width="34%" />
                        <OutpassText placeholder="Parent phone" value={finalData.pphone} width="32%" />
                        <OutpassText placeholder="Day of outing" value={finalData.outDate} width="32%" />
                        <OutpassText placeholder="In date" value={finalData.inDate} width="19%" />
                        <OutpassText placeholder="Out time" value={finalData.outTime} width="22%" />
                        <OutpassText placeholder="Availability" value={finalData.availability} width="27%" />
                        <OutpassText placeholder="Place of visit" value={finalData.place} width="30%" />
                        <OutpassText placeholder="Reason" value={finalData.reason} width="20%" />
                        <OutpassText placeholder="e-outpass id" value={finalData.timeStamp} width="28%" />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        //flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        padding: 20,
    },
    container: {
        padding: 10,
        margin: 10,
        marginVertical: 30,
        //borderTopWidth: 1,
        //borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    logoContainer: {
        //borderWidth: 1,
        //borderColor: 'black',
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    headContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    headerContainer: {
        width: '84.5%',
        left: 0,
    },
    header: {
        textAlign: 'center',
    },
    address: {
        fontSize: 10,
        //borderWidth: 1,
        //borderColor: 'black',
        textAlign: 'center',
    },
    cllg: {
        fontSize: 10,
        textAlign: 'center',
    },
    passContainer: {
        //top: 100,/
        marginTop: 20,
        //borderWidth: 1,
        //borderColor: 'black',
        //borderRadius: 10,
        //backgroundColor: 'yellow',
        //padding: 10,
        //height: 200,
    },
    outpassImageContainer: {
        width: 120,
        height: 150,
        //borderColor: 'black',
        //borderWidth: 5,
        borderRadius: 5,
        overflow: 'hidden',
        alignSelf: 'flex-end',
        //transform: [ { translateY: -75, }],
        //marginTop: -75,
        //marginRight: 10,
        backgroundColor: 'white',
    },
    stdimage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    },
    localText: {
        //paddingTop: 12,
        //marginLeft: 5,
        //borderBottomWidth: 1,
        //borderBottomColor: 'black',
        width: '59%',
        //textAlign: 'center',
        //transform: [ { translateY: -111, } ],
        marginTop: -150,
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailsContainer: {
        paddingVertical: 10,
        //borderWidth: 5,
        //borderColor: 'black',
        //marginTop: 10,
    },
})












/*const retrieveOutingDetails = ( values ) => {
        //setLoading(true)
        let userData, outingData, outPassData;
        try {
            //await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentUser = firebase.auth().currentUser;
    
            const db = firebase.database();
            var userDetails = db.ref('users/' + currentUser.uid)
            var outingDetails = db.ref('users/' + currentUser.uid + '/Local_outings/' + values.timeStamp)

            userDetails.on('value', (snapshot) => {
                userData = snapshot.val()
                //console.log("The retrieved data is", userData.name)
            })
            outingDetails.on('value', (snapshot) => {
                outingData = snapshot.val()
                //console.log("The retrieved data is", outingData)
            })
            console.log(userData, outingData)
            outPassData = {
                ...userData,
                ...outingData
            };
            //console.log("Final e-outpass data", outPassData)
            //Alert.alert("Success!");
            //setLoading(false)
            //return 1
        } 
        catch (err) {
            //setLoading(true)
            Alert.alert("Something wrong!", err.message);
            //setLoading(false)
            //return null
            //return err;
        }
        //setLoading(false)
        return outPassData
    }*/
