import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export const registration = async (name, regd, rollno, fathername, mothername, email, year, branch, home, password, sphone, pphone, images) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;

        const db = firebase.database();
        db.ref('users' + currentUser.uid)
        .set({
            email: currentUser.email,
            name: name,
            regd: regd,
            rollno: rollno,
            fathername: fathername,
            mothername: mothername,
            year: year,
            branch: branch,
            home: home,
            sphone: sphone,
            pphone: pphone,
            images: images,
        });
        return;
    } 
    catch (err) {
        return err;
        //Alert.alert("Something wrong!", err.message);
    }
}

export const signIn = async (email, password) => {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      Alert.alert("Success");
  } catch (err) {
    Alert.alert("Something wrong!", err.message);
  }
}

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('Something wrong!', err.message);
  }
}