import React, { useEffect, useRef, useContext } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appIcon from '../assets/images/app_icon.png';
import { colors, spacingSystem, typography } from '../commonStyles/responsiveTheme';
import { horizontalScale, verticalScale, fontScale, spacing, fontSize, lineHeight, screenDimensions } from '../utils/responsive';
import { AuthContext } from '../context/AuthContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LaunchScreen: React.FC = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  
  // Animation values
  const logoPosition = useRef(new Animated.Value(-300)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (authContext?.isLoggedIn) {
      navigation.navigate('Home' as never);
      return;
    }
    
    startAnimation();
  }, [authContext?.isLoggedIn, navigation]);

  const startAnimation = () => {
    // Reset values
    logoPosition.setValue(-100);
    logoScale.setValue(0.5);
    logoOpacity.setValue(0);
    textOpacity.setValue(0);
    textScale.setValue(0.8);

    // Create animation sequence
    const animationSequence = Animated.sequence([
      // Logo drops from top to center
      Animated.parallel([
        Animated.timing(logoPosition, {
          toValue: 0, // Center of screen 
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      

     
      // Show text with fade and scale
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Start the animation
    animationSequence.start(() => {
      setTimeout(() => {
        navigation.navigate('Login' as never);
      }, 500); // Wait 1 second after animation completes
    });
  };

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { translateY: logoPosition },
              { scale: logoScale },
            ],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image source={appIcon} style={styles.logo} />
      </Animated.View>

      {/* Animated Text */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ scale: textScale }],
          },
        ]}
      >

        <Animated.Text style={styles.tagline}>
          Secure Living, Simplified Management!
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    alignItems: 'center',
    width: screenDimensions.width, // Full device width
    height: screenDimensions.height, // Full device height
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: horizontalScale(120),
    height: horizontalScale(120),
    borderRadius: horizontalScale(24),
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginTop: horizontalScale(100), // Space below logo center
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  appName: {
    fontSize: fontScale(36),
    lineHeight: fontScale(42),
    fontWeight: 'bold',
    color: colors.textInverse,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  tagline: {
    fontSize: fontScale(16),
    lineHeight: fontScale(20),
    color: colors.primary,
    textAlign: 'center',
    opacity: 0.9,
    fontFamily: 'Poppins-Regular',
  },
});

export default LaunchScreen; 