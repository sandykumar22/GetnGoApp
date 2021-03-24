import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View, FlatList, Alert, ScrollView, RefreshControl } from 'react-native';
import * as firebase from 'firebase'

import Item from '../components/Item';
import ModalScreen from './ModalScreen';
import { Students } from './Students';
//import prompt from 'react-native-prompt-android';
import '../screens/NonLocalOutingScreen'
import { Inter_500Medium } from '@expo-google-fonts/dev';

//console.log(global.key)
const PendingScreen = () => {
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

    let finalUserData;


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
		let db;
		const currentUser = firebase.auth().currentUser
		const subscriber = firebase.firestore()
		.collection("Non_Local_outings")
		.onSnapshot(querySnapshot => {
			const users = [];
	  
			querySnapshot.forEach(documentSnapshot => {
			  users.push({
				...documentSnapshot.data(),
				key: documentSnapshot.id,
			  })
			})

			const outings = users.filter(user => {
				return user.userId === currentUser.uid
			})
	  
			//setUsers(users);
			db = firebase.database()
			.ref("users/" + currentUser.uid)
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
				const pendingData = finalData.filter((item) => {
					return item.status === "pending" && item.outDate === formatDate(todayDate)
				})
				console.log(pendingData)
				setLoading(false)
				setUsers(pendingData)
			})
	
		})
		
		// Unsubscribe from events when no longer in use
		return () => subscriber();

	}, []);


	const accept = (timeStamp) => {
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
						setUsers((prev) => {
							return prev.filter((item) => {
								return item.timeStamp != timeStamp;
							})
						})
					}
				},
			],
		)
	}


	const cancel = (timeStamp) => {
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
						setUsers((prev) => {
							return prev.filter((item) => {
								return item.timeStamp != timeStamp;
							})
						})


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
				return <Item data={item} type="pending" accept={accept} cancel={cancel} onPress={ItemPress} student={true} />
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

export default PendingScreen;