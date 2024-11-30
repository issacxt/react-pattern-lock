import React from 'react';
import { View, StyleSheet } from 'react-native';

const Col = ({ children, allign }) => <View style={{...styles.column, alignItems: allign}}>{children}</View>;

const Row = ({ children }) => <View style={styles.row}>{children}</View>;

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 0,
  },
  column: {
    flex: 1,
    paddingLeft: '10%',
    paddingRight: '10%'
  }
});

export {
  Col,
  Row
};
