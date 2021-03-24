import React from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

export default function ActivityIndicator({ visible=false }) {
    if(!visible) return null

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                loop
                source={require('../assets/animations/circle.json')}
                style={styles.loader}
                //autoSize
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //width: '100%',
        //height: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        //width: 150,
        height: 25,
        //backgroundColor: 'black',
    },
})