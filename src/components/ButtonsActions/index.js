import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { colors, icons } from 'src/constants'
import Moment from 'moment'

// import { Container } from './styles';

export default function ButtonsActions ({ onPinPress, onTimerPress, active, timer, second }) {
  const secondTimer = Moment('1900-01-01 00:00:00')
    .add(second, 'seconds').format(second > 3599 ? 'HH:mm:ss' : 'mm:ss')
  const seconds = second > 0
  return (
    <View style={styles.buttonsContainer}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onTimerPress} activeOpacity={0.7} style={styles.buttonContainer}>
          <Image
            source={!timer ? (second === 0) ? icons.timer : icons.play : icons.pause}
            resizeMode='contain'
            style={[styles.buttonsIcon, (timer && second > 0) && { height: 35 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPinPress('vertical', 'half')}
          activeOpacity={0.7}
          style={[styles.buttonContainer, (active || seconds) && styles.activeButton]}
        >
          <Image source={active ? icons.close : icons.pin} resizeMode='contain' style={styles.buttonsIcon} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }}>
        {(seconds && !active) && <Text style={{ fontSize: 16, color: colors.primaryTextColor }}>{secondTimer}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20
  },
  buttonContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    marginHorizontal: 10
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
