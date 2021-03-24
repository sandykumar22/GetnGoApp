import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableRipple } from 'react-native-paper'
import colors from '../config/colors'
import AppText from './AppText'

export default function ListItem({ image, name, desc, IconComponent, onPress, renderRightActions }) {

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableRipple
                onPress={onPress}
                borderless={true}
                //underlayColor={colors.lightGrey}
                >
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image 
                        style={styles.image}
                        source={image}
                    />}
                    <View style={styles.detailsContainer}>
                        <Text
                            style={styles.name}
                            numberOfLines={1}
                        >{name}</Text>
                        {desc && <Text
                            style={styles.desc}
                            numberOfLines={2}
                        >{desc}</Text>}
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={25} color={colors.medium} />
                </View>
            </TouchableRipple>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        alignItems: 'center',
        // marginTop: 20,
        /*marginLeft: 10,
        marginRight: 10,
        borderRadius: 70,*/
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 70,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontStyle: 'normal',
        color: colors.darkGrey,
        marginTop: 0,
    },
    desc: {
        fontSize: 14,
        fontStyle: 'normal',
        color: colors.medium,
        marginTop: 0,
    },
})