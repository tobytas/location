import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';
import TabBar from './TabBar';
import TextMessage from './TextMessage';
import { openWeatherKey } from './keys.js';

export default function App() {
  const [persistData, setPersistData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [display, setDisplay] = useState({ screen: 'first', chosen: 0 });
  
  const getCurrentInfo = async () => {
    const location = await Location.getCurrentPositionAsync({});

    // I don't have Google's key for reverse geocoding api, therefore using third party service.
    const position = await fetch(
      'https://api.bigdatacloud.net/data/reverse-geocode-client?' +
      `latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
    ).then(response => response.json());

    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?` +
      `q=${position.principalSubdivision}&units=metric&appid=${openWeatherKey}`
    ).then(response => response.json());

    const date = new Date().toString();
    return { location, position, weather, date };
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        const persist = await AsyncStorage.getItem('persist');
        const persJSON = persist ? JSON.parse(persist) : [];

        persJSON.unshift(await getCurrentInfo());
        await AsyncStorage.setItem('persist', JSON.stringify(persJSON));

        setPersistData(persJSON);
        // await AsyncStorage.removeItem('persist');
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message);
      }
    })();
  }, []);   // [] imitates componentDidMount

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextMessage 
          display={display} 
          data={persistData} 
          error={errorMsg}
          onChose={setDisplay}
        />
      </View>
      <TabBar setDisplay={setDisplay} display={display} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});
