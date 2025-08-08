import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <Button title="Register" onPress={() => navigation.navigate('Main')} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
