import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

export default function TabBarItem({ border, title, setDisplay, display }) {
  return (
    <TouchableHighlight
      underlayColor='#efefef'
      onPress={setDisplay}
      style={[styles.item,
        border ? styles.border : null,
        display.screen === title ? styles.selected : null]}
    >
      <Text style={[styles.itemText,
        display.screen === title ? styles.bold : null]}
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  border: {
    borderLeftWidth: 1,
    borderLeftColor: '#dddddd'
  },
  itemText: {
    color: '#777777',
    fontSize: 21
  },
  selected: {
    backgroundColor: '#ffffff'
  },
  bold: {
    fontWeight: 'bold'
  }
})
