import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

export default function TextMessage({ display, data, error, onChose }) {
  const getItemContent = (item) => (
    `latitude: ${item.location.coords.latitude.toFixed(3)} longitude: ${item.location.coords.longitude.toFixed(3)}\n` +
    `${item.position.countryName} ${item.position.principalSubdivision} ` +
    `${item.weather.main.temp} °C\n` +
    `${item.date.substring(0, 24)}`
  );

  const getListItemContent = (listItem) => (
    `${listItem.date.substring(0, 24)}; ` +
    `lat ${listItem.location.coords.latitude.toFixed(3)} lng ${listItem.location.coords.longitude.toFixed(3)}; ` +
    `${listItem.position.countryName} ${listItem.position.principalSubdivision}`
  );
    
  if (data.length === 0 && !error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{'Waiting..'}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {display.screen === 'first' ?
          <Text style={styles.text}>
            {data[0] ? getItemContent(data[0]) : ''}
          </Text>

        : display.screen == 'second' ?
          <ScrollView keyboardShouldPersistTaps='always'>
            {data.map((item, index) =>
              <TouchableHighlight
                underlayColor='#efefef'
                key={index} 
                style={styles.item}
                onPress={() => onChose({ screen: '', chosen: index })}
              >
                <Text style={styles.text}>
                  {getListItemContent(item)}
                </Text>
              </TouchableHighlight>
            )}
          </ScrollView> 
        :
          <Text style={styles.text}>
            {getItemContent(data[display.chosen])}
          </Text>
        }
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    margin: 8,
    borderColor: '#2b4842',
    borderWidth: 1,
    // backgroundColor: '#f2f8f2'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: 'rgba(120, 82, 82, 0.25)',
    fontWeight: '100'
  },
  error: {
    textAlign: 'center',
    fontSize: 30,
    color: 'rgba(120, 82, 82, 0.25)',
    fontWeight: '100'
  }
});
