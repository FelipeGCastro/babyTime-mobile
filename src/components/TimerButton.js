import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

import { icons, colors } from 'src/constants'

export default function TimerButton ({ onTimerPress, timer }) {
  return (
    <TouchableOpacity onPress={onTimerPress} activeOpacity={0.7} style={styles.buttonTimerContainer}>
      <Image
        source={!timer ? icons.play : icons.pause}
        resizeMode='contain'
        style={[styles.buttonsIcon, timer && { height: 20 }]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonTimerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: colors.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: colors.backgroundColor
  },
  buttonsIcon: {
    width: 25
  }
})
