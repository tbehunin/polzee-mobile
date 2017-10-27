import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const StatusBarBackground = (props) => (
  <View style={[styles.statusBarBackground, props.style || {}]} />
);

const styles = StyleSheet.create({
    statusBarBackground: {
      height: (Platform.OS === 'ios') ? 20 : 0,
      backgroundColor: "white",
    }
  });

export default StatusBarBackground;