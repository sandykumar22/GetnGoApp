import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, Button, View, FlatList, Alert, Modal, ScrollView, RefreshControl, LogBox } from 'react-native';
import * as firebase from 'firebase'

import Item from '../components/Item';
import ModalScreen from './ModalScreen';
import colors from '../config/colors';

const AcceptedScreen = () => {
	//const [ data, setdata ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ modal, setmodal ] = useState(false);
	const [ modaldata, setmodaldata ] = useState();
	const [ refreshing, setRefreshing ] = useState(false)
	//const [ scrollRefresh, setScrollRefresh ] = useState(false)
	const [ users, setUsers ] = useState([])
	const [ nonLocals, setNonLocals ] = useState([])
	const [ local, setLocal ] = useState(false)


	let finalUserData;

	const ItemPress = (data1, local) => {
		setLocal(local)
		setmodal(true);
		setmodaldata(data1);
	};

	const ModalClose = () => {
		setmodal(false);
		setmodaldata();
	};

	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
	}, [])

	const formatDate = (date) => {
        const finalDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return finalDate
    };



	useEffect(() => {
		
		const todayDate = new Date()
        //console.log(formatDate(todayDate))
		let db;
		const currentUser = firebase.auth().currentUser
		const subscriber = firebase.firestore()
		.collection("Local_outings")
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
				const localAcceptedData = finalData.filter((item) => {
					return item.date === formatDate(todayDate)
				})
				setLoading(false)
				setUsers(localAcceptedData)
			})
	
		})

		return () => subscriber();

	}, []);



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
				const NonLocalAcceptedData = finalData.filter((item) => {
					return item.outDate === formatDate(todayDate) && item.status === "accepted"
				})
				//console.log(NonLocalAcceptedData)
				setLoading(false)
				setNonLocals(NonLocalAcceptedData)
			})
	
		})

		return () => subscriber();

	}, []);






	const accept = (id) => {
		setdata((prev) => {
			return prev.filter((item) => {
				return item.id != id;
			});
		});
	};

	//console.log(users)

	let view = (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.local}>
				<Text style={styles.localText}>Accepted Local Outings</Text>
			</View>
			{users.length !== 0 ? 
				<FlatList
					horizontal={false}
					data={users}
					renderItem={({ item }) => {
						return <Item data={item} type="accepted" accept={accept} onPress={ItemPress} local={true} />;
					}}
					keyExtractor={(item) => item.timeStamp.toString()}
					refreshing={refreshing}
					onRefresh={() => {
						setRefreshing(false)
					}}
					showsVerticalScrollIndicator={false}
				/> :
				<View style={styles.noData}>
					<Text>No accepted Local outings</Text>
				</View>
			}
			<View style={styles.local}>
				<Text style={styles.localText}>Accepted Non-local Outings</Text>
			</View>
			{nonLocals.length !== 0 ?
				<FlatList
					horizontal={false}
					data={nonLocals}
					renderItem={({ item }) => {
						return <Item data={item} type="accepted" accept={accept} onPress={ItemPress} local={false} />;
					}}
					keyExtractor={(item) => item.timeStamp.toString()}
					refreshing={refreshing}
					onRefresh={() => {
						setRefreshing(false)
					}}
					showsVerticalScrollIndicator={false}
				/> :
				<View style={styles.noData}>
					<Text>No Non-Local accepted outings</Text>
				</View>
			}
		</ScrollView>
	);

	return (
		loading ?
	 	    (<View style={styles.loaderContainer}>
				<ActivityIndicator size='large' animating={loading} color="black" />
				<Text style={{ marginTop: 10, }}>Please wait while we fetch data</Text>
			</View>)
		:
		(<View style={styles.container}>
			{modal ? 
				<ModalScreen onClose={ModalClose} data={modaldata} local={local} />
				: 
				<View style={styles.screen}>
					{view}
				</View>
			}
		</View>)
	)
};

export default AcceptedScreen;

const styles = StyleSheet.create({
	totalOutings: {
		
	},
	container: {
		flex: 1,
		//marginBottom: 35,
		//backgroundColor: "white",
		// width:'100%',
		// width:Dimensions.get("screen").width,
		// alignItems:'center',
		// justifyContent:'center',
		//backgroundColor: colors.backColor,
	},
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
		//paddingTop: 20,
		//paddingBottom: 20,
	},
	local: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.danger,
		marginTop: 20,
		marginBottom: 10,
		borderRadius: 10,
	},
	localText: {
		color: "white",
	},
	noData: {
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		marginBottom: 20,
	},
});
