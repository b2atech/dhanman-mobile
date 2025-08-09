import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import appIcon from '../assets/images/app_icon.png';
import { auth0, AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import Logger from '../utils/logger';

interface LoginScreenProps {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { login, loginWithCredentials, isLoggedIn } = authContext || {};
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

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;

  const formattedPhoneNumber = `+91${phoneNumber}`;

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Main');
    } else {
      startAnimations();
    }
  }, [isLoggedIn]);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetForm = () => {
    setPhoneNumber('');
    setOtpCode('');
    setUsername('');
    setPassword('');
    setIsOtpSent(false);
    setLoginErrorMessage('');
    setOtpErrorMessage('');
    setCredentialsError('');
    setLoading(false);
  };

  const handleLogin = () => {
    if (!formattedPhoneNumber || phoneNumber.length < 10) {
      setLoginErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setLoginErrorMessage('');

    // Note: This method might need to be updated based on actual Auth0 API
    // auth0.passwordlessWithSMS is not a standard method
    Logger.info('Attempting to send OTP', { phoneNumber: formattedPhoneNumber });

    // Simulate OTP sending for now
    setTimeout(() => {
      setIsOtpSent(true);
      setLoading(false);
      Logger.info('OTP sent successfully', { phoneNumber: formattedPhoneNumber });
    }, 1000);
  };

  const handleOtpLogin = () => {
    if (!otpCode || otpCode.length < 4) {
      setOtpErrorMessage('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    setOtpErrorMessage('');

    if (login) {
      login(formattedPhoneNumber, otpCode)
        .then(() => {
          setLoading(false);
          Logger.userLogin('user', [], 'organization-id');
        })
        .catch((error: any) => {
          setLoading(false);
          setOtpErrorMessage('Invalid OTP. Please try again.');
          Logger.error('Error verifying OTP:', error);
        });
    }
  };

  const handleCredentialsLogin = () => {
    if (!username || !password) {
      setCredentialsError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setCredentialsError('');

    if (loginWithCredentials) {
      loginWithCredentials(username, password)
        .then(() => {
          setLoading(false);
          Logger.userLogin(username, [], 'organization-id');
        })
        .catch((error: any) => {
          setLoading(false);
          setCredentialsError('Invalid credentials. Please try again.');
          Logger.error('Error with credentials login:', error);
        });
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    auth0
      .webAuth.authorize({
        scope: 'openid profile email',
        connection: 'google-oauth2',
      })
      .then((credentials: any) => {
        setLoading(false);
        Logger.userLogin('google-user', [], 'organization-id');
        if (login) {
          login(credentials.phoneNumber, credentials.code);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        Logger.error('Google login error:', error);
        Alert.alert('Login Error', 'Failed to login with Google');
      });
  };

  const goBack = () => {
    setUseOtpLogin(false);
    setIsOtpSent(false);
    resetForm();
  };

  if (useOtpLogin && !isOtpSent) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScaleAnim }],
            },
          ]}>
          <Image source={appIcon} style={styles.logo} />
          <Text style={styles.title}>Login with OTP</Text>
        </Animated.View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
            leftIcon={{ type: 'font-awesome', name: 'phone' }}
            inputStyle={styles.inputText}
            containerStyle={styles.inputWrapper}
          />
          {loginErrorMessage ? (
            <Text style={styles.errorText}>{loginErrorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? 'Sending...' : 'Send OTP'}
            onPress={handleLogin}
            disabled={loading}
            buttonStyle={styles.otpButton}
            titleStyle={styles.buttonText}
          />

          <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
            <Text style={styles.goBackButtonText}>Back to Login Options</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  if (useOtpLogin && isOtpSent) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScaleAnim }],
            },
          ]}>
          <Image source={appIcon} style={styles.logo} />
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            Enter the OTP sent to {formattedPhoneNumber}
          </Text>
        </Animated.View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter OTP"
            value={otpCode}
            onChangeText={setOtpCode}
            keyboardType="number-pad"
            maxLength={6}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            inputStyle={styles.inputText}
            containerStyle={styles.inputWrapper}
          />
          {otpErrorMessage ? (
            <Text style={styles.errorText}>{otpErrorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? 'Verifying...' : 'Verify OTP'}
            onPress={handleOtpLogin}
            disabled={loading}
            buttonStyle={styles.otpButton}
            titleStyle={styles.buttonText}
          />

          <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
            <Text style={styles.goBackButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScaleAnim }],
          },
        ]}>
        <Image source={appIcon} style={styles.logo} />
        <Text style={styles.title}>Welcome to Dhanman</Text>
        <Text style={styles.subtitle}>Choose your login method</Text>
      </Animated.View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          inputStyle={styles.inputText}
          containerStyle={styles.inputWrapper}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          inputStyle={styles.inputText}
          containerStyle={styles.inputWrapper}
        />
        {credentialsError ? (
          <Text style={styles.errorText}>{credentialsError}</Text>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleCredentialsLogin}
          disabled={loading}
          buttonStyle={styles.loginButton}
          titleStyle={styles.buttonText}
        />

        <TouchableOpacity
          style={styles.otpButton}
          onPress={() => setUseOtpLogin(true)}>
          <Text style={styles.buttonText}>Login with OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 15,
    width: '100%',
  },
  otpButton: {
    backgroundColor: '#3B6FD6',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
