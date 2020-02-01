import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native'
import { colors } from '../../constants'
import Breast from 'src/assets/breast.png'
import Sleep from 'src/assets/sleep.png'
import Diaper from 'src/assets/diaper.png'
import Note from 'src/assets/note.png'
import Bath from 'src/assets/duck.png'

export default class CreatePin extends Component {
  state = {
    menuList: [
      { id: 1, color: colors.feedColor, icon: Breast, label: 'Alimentação', value: 'meal', checked: false },
      { id: 2, color: colors.sleepColor, icon: Sleep, label: 'Sono', value: 'sleep', checked: false },
      { id: 3, color: colors.diaperColor, icon: Diaper, label: 'Fralda', value: 'diaper', checked: false },
      { id: 4, color: colors.noteColor, icon: Note, label: 'Anotação', value: 'note', checked: false },
      { id: 5, color: colors.bathColor, icon: Bath, label: 'Banho', value: 'bath', checked: false }
    ]
  }

  handleMenuItemPress = index => () => {
    const newMenuList = this.state.menuList.map((item, idx) => {
      if (idx === index) {
        item.checked = !item.checked
      } else {
        item.checked = false
      }
      return item
    })
    this.setState({ menuList: newMenuList })
  }

  renderMenuItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={this.handleMenuItemPress(index)}
        activeOpacity={0.7}
        style={[styles.buttonContainer,
          item.checked && { borderBottomColor: item.color, borderBottomWidth: 2 }]}
      >
        <View style={[styles.iconContainer, { borderColor: item.color }]}>
          <Image source={item.icon} resizeMode='contain' style={styles.menuIcon} />
        </View>
        <Text style={{ fontSize: 16, marginBottom: 10, color: colors.primaryTextColor }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    const { menuList } = this.state
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 0 }}>
          <FlatList
            data={menuList}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderMenuItem}
            horizontal
          />
        </View>
        <View />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // PIN PAGE CONTAINER
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start'
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
