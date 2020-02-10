import React from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { colors } from 'src/constants'

const Note = ({ note, onHandleChange, option }) => {
  const countNote = 280 - note.length

  return (
    <View
      style={styles.container}
    >
      <TextInput
        value={note}
        style={styles.input}
        placeholderTextColor={colors.placeholderColor}
        placeholder='Escreva aqui sua anotação até 280 dígitos'
        maxLength={280}
        multiline
        returnKeyLabel='done'
        keyboardAppearance='dark'

        onChangeText={onHandleChange('note')}
      />
      <Text style={styles.countNote}>{countNote}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20
  },
  countNote: {
    fontSize: 14,
    color: colors.primaryTextColor,
    textAlign: 'center',
    marginTop: 10
  },
  input: {
    minHeight: 150,
    backgroundColor: 'rgba(255,255,255, 0.06)',
    borderRadius: 8,
    padding: 10,
    paddingTop: 10,
    color: colors.primaryTextColor
  }

})

export default Note
