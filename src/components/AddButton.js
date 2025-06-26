import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import PreApprovedEntries from '../screens/UserHome/PreApproved/PreApprovedEntry';

const {width, height} = Dimensions.get('window');

const FloatingActionButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const pan = useRef(
    new Animated.ValueXY({x: width - 80, y: height - 160}),
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({x: pan.x._value, y: pan.y._value});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();

        let newX = Math.min(Math.max(pan.x._value, 10), width - 70);
        let newY = Math.min(Math.max(pan.y._value, 10), height - 140);

        Animated.spring(pan, {
          toValue: {x: newX, y: newY},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          console.log('FAB Clicked!');
          setModalVisible(true);
        }}
        style={[styles.fab, {transform: pan.getTranslateTransform()}]}>
        <Animated.View {...panResponder.panHandlers} style={styles.fabInner}>
          <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>

      <PreApprovedEntries
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B6FD6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingActionButton;
