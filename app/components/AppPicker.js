import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar, Modal, TouchableWithoutFeedback, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableRipple } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'

import Screen from '../components/Screen'
import colors from '../config/colors'
import PickerItem from './PickerItem'


export default function AppPicker({ icon, placeholder, items, selectedItem, onSelectItem, width = '100%', PicketItemComponent = PickerItem }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.mainContainer}>
                    <View style={[styles.container, width]}>
                        {icon && <FontAwesome5 name={icon} size={25} color="white" style={styles.icon} />}
                        <Text style={styles.text}>{selectedItem ? selectedItem : placeholder}</Text>
                        <MaterialCommunityIcons 
                            name="chevron-down" 
                            size={22}
                            color={colors.medium}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <TouchableRipple
                        style={styles.button}
                        borderless={true}
                        onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableRipple>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.value.toString()} 
                        renderItem={({ item }) => 
                            <PicketItemComponent 
                                item={item}
                                onPress={() => {
                                    setModalVisible(false)
                                    onSelectItem(item)
                                }}
                            />
                        }
                    />
                </Screen>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    container: {
        paddingRight: 15,
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.color11,
        // marginVertical: StatusBar.currentHeight + 30,
        alignItems: 'center',
        alignSelf: 'center',
    },
    icon: {
        backgroundColor: colors.color11,
        padding: 15,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 2,
        borderColor: colors.color11,
        width: '21%',
        marginRight: 10,
    },
    text: {
        flex: 1,
        marginLeft: 5,
        fontSize: 16,
        color: colors.grey,
    },
    button: {
        marginBottom: 20,
        color: colors.dark,
        width: '50%',
        backgroundColor: colors.backColor,
        alignSelf: 'center',
        padding: 15,
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
    },
})