import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Button, Alert, Image, TouchableOpacity, StatusBar } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import colors from '../config/colors';
import NonLocalOutPassModal from './NonLocalOutPassModal';
import LocalEOutPassModal from './LocalEOutPassModal'
import * as firebase from 'firebase'

export default function ModalScreen({ onClose, data, local }) {

	const [ details, setDetails ] = useState([])
	const close = () => {
		onClose();
	};
	//console.log(data)


	useEffect(() => {

		const currentUser = firebase.auth().currentUser

		const db = firebase.database()
		db.ref("users/" + currentUser.uid)
		.on('value', (snapshot) => {
			const user = snapshot.val()
			setDetails(user)
		})

	}, [])

	return (
		<View style={{ backgroundColor: '#000000aa', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ backgroundColor: '#fff', margin: 50, padding: 50 }}>
				<Modal
					// visible={show}
					// transparent={true}
					style={{ border: 'none' }}
					animationType='slide'
					// transparent={true}
				>
					<TouchableRipple
                        style={styles.button}
                        borderless={true}
                        onPress={close}
					>
                        <Text>Close</Text>
                    </TouchableRipple>
					{local ? 
					    <LocalEOutPassModal values={data} user={details} />
						:
						<NonLocalOutPassModal values={data} user={details} />
					}
				</Modal>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 28,
        marginBottom: 15,
        color: colors.dark,
        width: '50%',
        backgroundColor: colors.backColor,
        alignSelf: 'center',
        padding: 15,
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
    },

	image: {
		height: 100,
		width: 100,
		borderRadius: 40,
		resizeMode: 'contain'
	}
});
