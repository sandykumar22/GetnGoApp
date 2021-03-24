import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View, FlatList, Alert, ScrollView, RefreshControl } from 'react-native';
import * as firebase from 'firebase'

import Item from '../components/Item';
import ModalScreen from './ModalScreen';
//import prompt from 'react-native-prompt-android';
import { Inter_500Medium } from '@expo-google-fonts/dev';
import { MaterialCommunityIcons } from "@expo/vector-icons"

//console.log(global.key)
const NonLocalPendings = () => {
	//const [ data, setData ] = useState([]);
	//const [ finalUsers, setFinalUsers ] = useState([])
	const [ loading, setLoading ] = useState(true);
	const [ modal, setmodal ] = useState(false);
	const [ modaldata, setmodaldata ] = useState();
	//const [ promptVisible, setPromptVisible ] = useState(false)
	//const [ details, setDetails ] = useState()
	const [ refreshing, setRefreshing ] = useState(false)
	const [ scrollRefresh, setScrollRefresh ] = useState(false)
	const [ users, setUsers ] = useState([])

    //let finalUserData;
	//let finalData;

	const formatDate = (date) => {
        const finalDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return finalDate
    };


	const ItemPress = (data1) => {
		setmodal(true);
		setmodaldata(data1);
	};

	const ModalClose = () => {
		setmodal(false);
		setmodaldata();
	};

	useEffect(() => {

		const todayDate = new Date()
        //console.log(formatDate(todayDate))
		//var outings = []
		//const currentUser = firebase.auth().currentUser
		const db = firebase.database()
		const subscriber = firebase.firestore()
		.collection("Non_Local_outings")
		.onSnapshot(querySnapshot => {
			const outings = []

			querySnapshot.forEach(documentSnapshot => {
				outings.push({
					...documentSnapshot.data(),
					key: documentSnapshot.id,
				})
			})
			//console.log(outings)

			const finalData = outings.map(outing => {
				const uid = outing.userId
				db.ref("users/" + uid)
				.on("value", (snapshot) => {
					const userData = snapshot.val()

					outing.branch = userData.branch
					outing.email = userData.email
					outing.fathername = userData.fathername
					outing.home = userData.home
					outing.images = userData.images
					outing.mothername = userData.mothername
					outing.name = userData.name
					outing.pphone = userData.pphone
					outing.regd = userData.regd
					outing.rollno = userData.rollno
					outing.sphone = userData.sphone
					outing.year = userData.year
				})
				return outing
			})
			//console.log(finalData)
			const finalOutings = finalData.filter(outing => {
				return outing.status === "pending" && outing.outDate == formatDate(todayDate)
			})
			//console.log(finalOutings)
			setLoading(false)
			setUsers(finalOutings)

		})
		// Unsubscribe from events when no longer in use
		return () => subscriber();

	}, []);


	const accept = ( item ) => {
		Alert.alert(
			"Accept this request",
			"Are you sure want to accept this request?",
			[
				{
					text: "Cancel",
					onPress: () => {}
				},
				{
					text: "Accept",
					onPress: () => {

						try {
							firebase.firestore()
							.collection("Non_Local_outings")
							.doc(item.timeStamp)
							.update({
								status: "accepted",
							}).then(() => {
								Alert.alert(
									"Success",
									"outpass with id - " + item.timeStamp + " is accepted",
								)
							})
						}
						catch(err) {
							Alert.alert("Something wrong!", err.message)
						}
					}
				},
			],
		)
	}


	const cancel = ( item ) => {
		Alert.alert(
			"Delete this request",
			"Are you sure want to delete this request?",
			[
				{
					text: "Cancel",
					onPress: () => {},
				},
				{
					text: "delete",
					onPress: () => {

						try {
							firebase.firestore()
							.collection("Non_Local_outings")
							.doc(item.timeStamp)
							.delete().then(() => {
								Alert.alert(
									"Success",
									"outpass with id - " + item.timeStamp + " is deleted",
								)
							})
						}
						catch(err) {
							Alert.alert("Something wrong!", err.message)
						}


						//setPromptVisible(true)
						/*prompt(
							'Enter password',
							'Enter your password to claim your $1.5B in lottery winnings',
							[
							 {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
							 {text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password)},
							],
							{
								type: 'secure-text',
								cancelable: false,
								defaultValue: 'test',
								placeholder: 'placeholder'
							}
						)*/
						

					}
				},
			],
		)
	}
	//console.log(users)

	let view = (
		<FlatList
			data={users}
			renderItem={({ item }) => {
				return <Item data={item} type="pending" accept={accept} cancel={cancel} onPress={ItemPress} student={false} />
			}}
			keyExtractor={(item) => item.timeStamp.toString()}
			refreshing={refreshing}
			onRefresh={() => {
				setRefreshing(false)
			}}
			showsVerticalScrollIndicator={false}
		/>
	);

	return (
		loading ? 
	 	    (<View style={styles.loaderContainer}>
				<ActivityIndicator size='large' animating={loading} color="black" />
				<Text style={{ marginTop: 10, }}>Please wait while we fetch data</Text>
			</View>)
		:
		users.length !== 0 ? 
			(<View style={styles.container}>
				{modal ? 
					<ModalScreen onClose={ModalClose} data={modaldata} />
					: 
					<View style={styles.screen}>
						{view}
					</View>
				}
			</View>)
			:
			(<ScrollView
				contentContainerStyle={styles.mainContainer}
				refreshControl={
					<RefreshControl 
						refreshing={scrollRefresh} 
						onRefresh={() => {
							setScrollRefresh(false)
							//setloading(false)
						}
					}
				/>}
			>
				<View style={styles.textContainer}>
					<Text>No pending requests</Text>
				</View>
			</ScrollView>
		)
	)
}



const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		//backgroundColor: 'gray',
	},
	loaderContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	screen: {
		paddingHorizontal: 15,
	},
})

export default NonLocalPendings;




/*

querySnapshot.forEach(documentSnapshot => {
				const userId = documentSnapshot.id
				//console.log(userId)
				sub
				.doc(documentSnapshot.id)
				.collection("Non_Local_outings")
				.onSnapshot(querySnapshot => {
					const outings = []

					querySnapshot.forEach(documentSnapshot => {
						outings.push({
							...documentSnapshot.data(),
							key: documentSnapshot.id,
						})
					})

					db = firebase.database()
					.ref("users/" + userId)
					.on("value", (snapshot) => {
						finalUserData = snapshot.val()
						//console.log(finalUserData)
						const finalData = outings.map(user => {
							user.branch = finalUserData.branch
							user.email = finalUserData.email
							user.fathername = finalUserData.fathername
							user.home = finalUserData.home
							user.images = finalUserData.images
							user.mothername = finalUserData.mothername
							user.name = finalUserData.name
							user.pphone = finalUserData.pphone
							user.regd = finalUserData.regd
							user.rollno = finalUserData.rollno
							user.sphone = finalUserData.sphone
							user.year = finalUserData.year
							return user
							//console.log(user)
						})
						pendingData = finalData.filter((item) => {
							return item.status === "pending" && item.outDate === formatDate(todayDate)
						})
						console.log(pendingData)
					})
					console.log(userId)
					details.push({
						...pendingData,
						key: documentSnapshot.id,
					})
				})
				fullData = details.forEach(user => {
					return user
				})
			})

*/