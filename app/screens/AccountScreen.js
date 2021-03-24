import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import Icon from '../components/Icon'
import ListItem from '../components/ListItem'
import ListItemSeperator from '../components/ListItemSeperator'
import Screen from '../components/Screen'
import colors from '../config/colors'

export default function AccountScreen({ navigation }) {
    const menuItems = [
        {
            title: "Account",
            desc: "Privacy, change number",
            icon: {
                name: "key",
                bacgroundColor: colors.primary,
            },
            targetScreen: "MyListings",
        },
        {
            title: "Settings",
            desc: "System settings",
            icon: {
                name: "wrench",
                bacgroundColor: colors.primary,
            },
            targetScreen: "Messages",
        },
        {
            title: "Notifications",
            desc: "Message, badges",
            icon: {
                name: "bell",
                bacgroundColor: colors.primary,
            },
            targetScreen: "Messages",
        },
        {
            title: "Help",
            desc: "Help center, contact us, privacy policy",
            icon: {
                name: "help-circle",
                bacgroundColor: colors.primary,
            },
            targetScreen: "Messages",
        },
    ]
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                   name="Kairamkonda Sandeep Kumar"
                   desc="411826@student.nitandhra.ac.in"
                   image={require('../assets/IMG20180913161021.jpg')}
                   onPress={() => console.log("button tapped")}
                />
            </View>
            {/*<ListItemSeperator />*/}
            <View style={styles.container}>
                <FlatList 
                        data={menuItems}
                        keyExtractor={menuItem => menuItem.title}
                        renderItem={({ item }) =>
                            <ListItem
                                name={item.title}
                                IconComponent={
                                    <Icon 
                                    name={item.icon.name}
                                    backgroundColor={item.icon.bacgroundColor}
                                />}
                                desc={item.desc}
                                onPress={() => console.log("button pressed")}
                            />
                        }
                        //ItemSeparatorComponent={ListItemSeperator}
                    />
            </View>
            <View style={styles.container}>
                {/*<ListItemSeperator />*/}
                <ListItem 
                    name="Log out"
                    IconComponent={
                        <Icon 
                        name="logout"
                        backgroundColor={colors.danger}
                    />}
                    onPress={() => console.log("button tapped")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        marginTop: 20,
    },
})