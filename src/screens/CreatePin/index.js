import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native'
import { colors } from '../../constants'
import Breast from 'src/assets/breast.png'
import Sleep from 'src/assets/sleep.png'
import Diaper from 'src/assets/diaper.png'
import Note from 'src/assets/note.png'
import Bath from 'src/assets/duck.png'

const menuList = [
  { id: 1, color: colors.feedColor, icon: Breast, label: 'Alimentação', value: 'meal' },
  { id: 2, color: colors.sleepColor, icon: Sleep, label: 'Sono', value: 'sleep' },
  { id: 3, color: colors.diaperColor, icon: Diaper, label: 'Fralda', value: 'diaper' },
  { id: 4, color: colors.noteColor, icon: Note, label: 'Anotação', value: 'note' },
  { id: 5, color: colors.bathColor, icon: Bath, label: 'Banho', value: 'bath' }
]

export default class CreatePin extends Component {
  state = {
    checked: ''
  }

  handleMenuItemPress = (item, position) => () => {
    const { onAnimatedPress } = this.props
    this.setState({ checked: item })
    onAnimatedPress('vertical', position)
  }

  renderMenuItem = ({ item, index }) => {
    const { checked } = this.state
    return (
      <TouchableOpacity
        onPress={this.handleMenuItemPress(item.value, 'complete')}
        activeOpacity={0.7}
        style={[styles.buttonContainer,
          item.value === checked && { borderBottomColor: item.color, borderBottomWidth: 2 }]}
      >
        <View style={[styles.iconContainer, { borderColor: item.color }]}>
          <Image source={item.icon} resizeMode='contain' style={styles.menuIcon} />
        </View>
        <Text style={{ fontSize: 16, marginBottom: 10, color: colors.primaryTextColor }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          <FlatList
            data={menuList}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderMenuItem}
            horizontal
          />
        </View>
        <View />
        <TouchableOpacity
          onPress={this.handleMenuItemPress(this.state.checked, 'close')}
          style={{ width: 140, height: 45, backgroundColor: colors.activeColor, marginBottom: 20, alignSelf: 'center' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // PIN PAGE CONTAINER
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  buttonsIcon: {
    width: 50
  },
  menuIcon: {
    width: 35
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7
  },
  iconContainer: {
    borderWidth: 3,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  closePin: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    top: 20
  }

  // TERMINA AQUI
})
