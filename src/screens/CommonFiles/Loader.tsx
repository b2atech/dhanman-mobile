// common/Loader.js
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = ({visible}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#3B6FD6" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default Loader;
