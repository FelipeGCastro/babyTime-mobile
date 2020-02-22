import React, { Component } from 'react'

import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { colors } from 'src/constants'

// import { Container } from './styles';
const menuList = [
  { id: 1, color: colors.feedColor, label: 'Alimentação', value: 'feed' },
  { id: 2, color: colors.sleepColor, label: 'Sono', value: 'sleep' },
  { id: 3, color: colors.diaperColor, label: 'Fralda', value: 'diaper' },
  { id: 4, color: colors.noteColor, label: 'Anotação', value: 'note' },
  { id: 5, color: colors.bathColor, label: 'Banho', value: 'bath' },
  { id: 6, color: colors.primaryTextColor, label: 'Todos', value: 'all' }
]
export default class SideScreen extends Component {
  state = {
    selected: false
  }

  renderMenuItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={this.handleSelectItem(item.value)}
        style={[styles.optionContainer, { borderColor: item.color }]}
      >
        <Text style={styles.textOption}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  handleSelectItem = value => () => {
    const { onAnimatedPress } = this.props
    onAnimatedPress('horizontal', 'half')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          <FlatList
            data={menuList}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderMenuItem}
          />
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  optionContainer: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20
  },
  textOption: {
    fontSize: 18,
    color: colors.primaryTextColor
  }
})
