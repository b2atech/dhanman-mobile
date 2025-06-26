import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import DPLogo from '../assets/dpLogo.png';
import {auth0, AuthContext} from '../context/AuthContext';
import PropTypes from 'prop-types';

const LoginScreen = ({navigation}) => {
  const {login, loginWithCredentials, isLoggedIn} = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [useOtpLogin, setUseOtpLogin] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [credentialsError, setCredentialsError] = useState('');
  const [loading, setLoading] = useState(false);

  const formattedPhoneNumber = `+91${phoneNumber}`;

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn, navigation]);

  const handlePhoneNumberChange = text => {
    const strippedText = text.replace(/\D/g, '');
    if (strippedText.length <= 10) {
      setPhoneNumber(strippedText);
    }
  };

  const handleLoginWithCredentials = async () => {
    try {
      setLoading(true);
      setCredentialsError('');
      await loginWithCredentials(username, password);
      Alert.alert('Logged in successfully');
      navigation.navigate('Home');
    } catch (error) {
      setCredentialsError('Invalid username or password');
      console.error('Login with credentials error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendSMS = async () => {
    try {
      setLoading(true);
      await auth0.auth.passwordlessWithSMS({
        phone_number: formattedPhoneNumber,
      });
      setIsOtpSent(true);
      Alert.alert('OTP sent successfully');
    } catch (error) {
      setLoginErrorMessage('Failed to send OTP. Please try again.');
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithOTP = async () => {
    try {
      setLoading(true);
      await login(formattedPhoneNumber, otpCode);
      Alert.alert('Logged in successfully');
      navigation.navigate('Home');
    } catch (error) {
      setOtpErrorMessage('Wrong OTP. Please try again');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setUseOtpLogin(!useOtpLogin);
    setUsername('');
    setPassword('');
    setPhoneNumber('');
    setOtpCode('');
    setIsOtpSent(false);
    setLoginErrorMessage('');
    setOtpErrorMessage('');
    setCredentialsError('');
  };

  const handleGoBack = () => {
    setIsOtpSent(false);
    setOtpCode('');
    setOtpErrorMessage('');
  };

  if (isLoggedIn) return null;

  return (
    <View style={styles.container}>
      <Image source={DPLogo} style={styles.logo} />
      <Text style={styles.tagline}>Secure Living, Simplified Management!</Text>

      {!useOtpLogin ? (
        <>
          <Input
            placeholder="Username"
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            errorMessage={credentialsError}
            errorStyle={styles.errorText}
          />
          <Button
            title="Login"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={handleLoginWithCredentials}
            disabled={!username || !password || loading}
            loading={loading}
          />
          <TouchableOpacity
            style={styles.helpContainer}
            onPress={toggleLoginMethod}>
            <Text style={styles.helpText}>Log in with Phone Number</Text>
          </TouchableOpacity>
        </>
      ) : !isOtpSent ? (
        <>
          <Text style={styles.header}>Enter Registered Mobile Number</Text>
          <Input
            placeholder="Enter 10-digit phone number"
            keyboardType="phone-pad"
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            errorMessage={loginErrorMessage}
            errorStyle={styles.errorText}
            maxLength={10}
          />
          <Button
            title="Send OTP"
            type="solid"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            containerStyle={styles.buttonContainer}
            onPress={sendSMS}
            disabled={phoneNumber.length !== 10 || loading}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.helpContainer}
            onPress={toggleLoginMethod}>
            <Text style={styles.helpText}>← Back to Log in </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.header}>Enter OTP</Text>
          <Input
            keyboardType="number-pad"
            placeholder="Enter OTP"
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            value={otpCode}
            onChangeText={setOtpCode}
            errorMessage={otpErrorMessage}
            errorStyle={styles.errorText}
            maxLength={6}
          />
          <Button
            title="Login"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={loginWithOTP}
            disabled={otpCode.length !== 6 || loading}
            loading={loading}
          />
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={styles.goBackButtonText}>← Back to Phone Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3B6FD6',
    borderRadius: 5,
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  helpContainer: {
    marginTop: 10,
  },
  helpText: {
    color: '#3B6FD6',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  goBackButton: {
    backgroundColor: '#3B6FD6',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
  },
});

export default LoginScreen;
