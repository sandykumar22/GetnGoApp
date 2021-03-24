import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Button, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors';
import { TouchableRipple } from 'react-native-paper'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const Item = ({ data, accept, type, onPress, cancel, student, local }) => {
	//const [ student, setStudent ] = useState(true)
	const acceptdata = () => {
		accept(data.timeStamp);
	};

	const canceldata = () => {
		cancel(data.timeStamp);
	};

	const viewmodal = () => {
		onPress(data, local);
	};

	return (
		<View style={styles.major}>
			<TouchableRipple
			    style={styles.fullContainer}
				borderless={true}
				rippleColor="rgba(0, 0, 0, .12)"
				onPress={viewmodal}
			>
				<>
					<View style={styles.itemcontainer}>
						<Image
							style={styles.image}
							source={{
								uri: data.images
							}}
						/>
						<View style={styles.details}>
							<Text style={{
								//borderWidth: 1,
								width: "100%",
								fontSize: 14,
								fontWeight: "bold",
							}} 
							numberOfLines={1}
							>
								{data.name}
							</Text>
							<Text
							    style={{
									//borderWidth: 1,
									fontSize: 12,
								}}
							>{data.rollno}</Text>
							{/*<Text>Outingtype: {data.outingtype}</Text>*/}
						</View>
						<View style={styles.buttoncontainer}>
							{type == 'pending' ? (
								student ?
									<View>
										<FontAwesome5 name="exclamation-circle" size={26} color={colors.danger} />
									</View> 
								:
									<View style={styles.container}>
										<TouchableWithoutFeedback onPress={acceptdata}>
											<MaterialCommunityIcons name="checkbox-marked" size={30} color="green" />
										</TouchableWithoutFeedback>
										<TouchableWithoutFeedback onPress={canceldata}>
											<MaterialCommunityIcons name="close-box" size={30} color={colors.danger} />
										</TouchableWithoutFeedback>
									</View>
							) : (
								<View>
									<MaterialCommunityIcons name="check-circle" size={30} color="green" />
								</View>
							)}
						</View>
					</View>
					{/*<View style={styles.seperator} />*/}
				</>
			</TouchableRipple>
		</View>
	);
};

const styles = StyleSheet.create({
	major: {
		marginVertical: 8,
	},
	container: {
		flex: 1,
		backgroundColor: "white",
		//alignContent: "center",
		//justifyContent: 'center',
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 25,
		resizeMode: 'cover',
		alignSelf: "center",
		right: 5,
	},

	itemcontainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		//borderBottomWidth: 1,
		//borderBottomColor: "rgba(0, 0, 0, .12)",
		backgroundColor: 'white',
		padding: 15,
		//borderRadius: 5,
	},
	details: {
		flexDirection: 'column',
		justifyContent: 'center',
		right: 5,
		width: "60%",
		overflow: 'hidden',
	},

	buttoncontainer: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	seperator: {
		//paddingLeft: 200,
		//width: "72%",
		borderBottomWidth: 1,
		//borderWidth: 1,
		borderBottomColor: "rgba(0, 0, 0, .12)",
		alignSelf: 'flex-end',
		//height: 1,
		backgroundColor: "white",
	},
	fullContainer: {
		borderRadius: 10,
	},
});
export default Item;
