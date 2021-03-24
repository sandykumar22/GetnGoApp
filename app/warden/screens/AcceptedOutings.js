import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, Button, View, FlatList, Alert, Modal, ScrollView, RefreshControl, LogBox } from 'react-native';
import * as firebase from 'firebase'

import Item from '../components/Item';
import ModalScreen from './ModalScreen';
import colors from '../config/colors';

const AcceptedOutings = () => {
	//const [ data, setdata ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ modal, setmodal ] = useState(false);
	const [ modaldata, setmodaldata ] = useState();
	const [ refreshing, setRefreshing ] = useState(false)
	const [ scrollRefresh, setScrollRefresh ] = useState(false)
	const [ users, setUsers ] = useState([])
	//const [ nonLocals, setNonLocals ] = useState([])
	const [ local, setLocal ] = useState(false)


	//let finalUserData;

	const ItemPress = (data1, local) => {
		setLocal(local)
		setmodal(true);
		setmodaldata(data1);
	};

	const ModalClose = () => {
		setmodal(false);
		setmodaldata();
	};

	/*const getdata = async () => {
		try {
			const result = await Students;
			setdata(result);
			setloading(false);
		} catch (err) {
			Alert.alert('Error');
		}
	};

	React.useEffect(() => {
		getdata();
	}, []);*/

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
				return outing.status === "accepted" && outing.outDate == formatDate(todayDate)
			})
			//console.log(finalOutings)
			setLoading(false)
			setUsers(finalOutings)

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

	//console.log(users)*/

	let view = (
		<FlatList
			data={users}
			renderItem={({ item }) => {
				return <Item data={item} type="accepted" accept={accept} onPress={ItemPress} student={false} />
			}}
			keyExtractor={(item) => item.timeStamp.toString()}
			refreshing={refreshing}
			onRefresh={() => {
				setRefreshing(false)
			}}
			showsVerticalScrollIndicator={false}
		/>			
	)

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
					<Text>No Accepted requests</Text>
				</View>
			</ScrollView>
		)
	)
};



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

export default AcceptedOutings;
