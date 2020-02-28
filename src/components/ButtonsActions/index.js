import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { colors, icons } from 'src/constants'

// import { Container } from './styles';

export default function ButtonsActions ({ onPinPress, onTimerPress, active, timer, second }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={onTimerPress} activeOpacity={0.7} style={styles.buttonContainer}>
        <Image
          source={!timer ? (second === 0) ? icons.timer : icons.play : icons.pause}
          resizeMode='contain'
          style={styles.buttonsIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPinPress('vertical', 'half')}
        activeOpacity={0.7}
        style={[styles.buttonContainer, active && styles.activeButton]}
      >
        <Image source={active ? icons.close : icons.pin} resizeMode='contain' style={styles.buttonsIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 5,
    bottom: 30
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    margin: 10
  },
  activeButton: {
    borderWidth: 0,
    backgroundColor: colors.activeColor
  },
  buttonsIcon: {
    width: 40,
    height: 40
  }
})
