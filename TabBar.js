import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabBarItem from './TabBarItem';

export default function TabBar({ setDisplay, display }) {
  return (
    <View style={styles.container}>
      <TabBarItem 
        display={display}
        title='first'
        setDisplay={() => setDisplay({ screen: 'first', chosen: 0 })}
      />
      <TabBarItem
        display={display}
        border
        title='second'
        setDisplay={() => setDisplay({ screen: 'second', chosen: 0 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dddddd'
  }
});
