import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import { AppLoading } from 'expo-app-loading'
import WelcomeScreen from './app/screens/WelcomeScreen';
import AppLogo from './app/components/AppLogo';
import colors from './app/config/colors';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import AuthNavigator from './app/navigation/AuthNavigator';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeNavigator from './app/navigation/HomeNavigator';
import AppPicker from './app/components/AppPicker'
import * as firebase from 'firebase'
import apiKeys from './config/keys'
import AuthContext from './app/auth/context'
import PendingOutingsNavigator from './app/warden/navigation/PendingOutingsNavigator';

//firebase.initializeApp(apiKeys.firebaseConfig)
//export const AuthContext = React.createContext()

if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(apiKeys.firebaseConfig);
}

export default function App() {

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)

    // unsubscribe on unmount
    return () => authSubscriber();
  }, [])

  if (initializing) {
    return null
  }

  return (
    <AuthContext.Provider value={user}>
      <NavigationContainer>
        {user ? <HomeNavigator /> : <AuthNavigator/>}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {},
})