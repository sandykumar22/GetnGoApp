import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';

export default function LoadingScreen({ navigation }) {
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('Welcome');
        }
      });
    }
  );

  return (
    <View style={styles.container}>
        <ActivityIndicator size='large' />
    </View>
  );
}