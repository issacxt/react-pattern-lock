import React from 'react';
import { StyleSheet, View } from 'react-native';
import PatternLock from './components/PatternLock';

const App = () => (
  <View style={styles.container}>
    <PatternLock />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
