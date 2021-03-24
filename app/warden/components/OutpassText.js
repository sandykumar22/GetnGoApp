import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

export default function OutpassText({ placeholder, value, width="45%", length="100%" }) {
    return (
        <View style={styles.container}>
            <View style={[styles.text1Container, { width: width }]}>
                <Text style={styles.text1}>{placeholder}</Text>
            </View>
            <View style={[styles.text2Container, { width: length }]}>
                <FontAwesome5 name="arrow-right" size={15} color="black" />
                <Text style={styles.text2}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
        marginBottom: 15,
    },
    text1: {
        fontSize: 14,
        justifyContent: 'center',
        color: 'gray',
        //backgroundColor: 'lightgray',
        padding: 5,
        //borderBottomColor: 'black',
        //borderBottomWidth: 1,
    },
    text2: {
        left: 5,
        width: '90%',
        fontSize: 18,
        justifyContent: 'center',
        fontWeight: 'bold',
        //borderLeftWidth: 3,
        //borderLeftColor: 'lightgray',
        //paddingLeft: 8,
        //borderRadius: 2,
        //borderWidth: 1,
    },
    text1Container: {
        width: '21%',
        borderRadius: 4,
        backgroundColor: '#F0F5F9',
        alignItems: 'center',
        marginBottom: 0,
        //borderWidth: 1,
    },
    text2Container: {
        left: 5,
        //backgroundColor: 'gray',
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        width: "100%",
        //borderWidth: 1,
    },
})