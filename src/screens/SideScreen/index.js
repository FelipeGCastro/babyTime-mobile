import React, { Component } from 'react'

import { View, FlatList, TouchableOpacity, StyleSheet, Text, LayoutAnimation } from 'react-native'
import { colors, polyglot } from 'src/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Options } from 'src/components'

// import { Container } from './styles';
const menuList = [
  'feed',
  'sleep',
  'diaper',
  'note',
  'bath',
  'all'
]
export default class SideScreen extends Component {
  state = {
    selected: false,
    type: false
  }

  componentDidMount = async () => {
    if (this.props.editing) {
      await this.handleSetEditing()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.editing && (prevProps.editing !== this.props.editing)) {
      this.handleSetEditing()
    }
  }

  handleSetEditing = () => {
    const { editing } = this.props
    this.setState({ ...this.state, ...editing })
  }

  renderMenuItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={this.handleSelectItem(item)}
        style={[styles.optionContainer, { borderColor: colors[item] }]}
      >
        <Text style={styles.textOption}>{polyglot.t(item)}</Text>
      </TouchableOpacity>
    )
  }

  handleSelectItem = value => () => {
    const { onItemPress } = this.props
    onItemPress(value)
  }

  handleChange = name => value => {
    this.setState({ [name]: value })
    if (name === 'option') { LayoutAnimation.easeInEaseOut() }
  }

  handleCloseBottom = () => {
    const { onAnimatedPress, onChange } = this.props
    onAnimatedPress('horizontal', 'close')
    onChange('editing')(false)
    setTimeout(() => {
      this.setState({ type: false })
    }, 800)
  }

  handleJustClose = () => {
    const { onAnimatedPress } = this.props
    onAnimatedPress('horizontal', 'close')
  }

  renderClose = () => (

    <TouchableOpacity
      onPress={this.handleJustClose}
      style={styles.cancel}
    >
      <Text style={styles.buttonText}>X</Text>
    </TouchableOpacity>
  )

  renderOptions = (item) => {
    const { comments, option, note, startTime, startDate, endTime, endDate, ml } = this.state
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerScroll}
        keyboardShouldPersistTaps='handled'
        extraScrollHeight={40}
      >
        <Text style={styles.editingTitle}>{polyglot.t('editing')}</Text>
        <Options
          item={item}
          option={option}
          onHandleChange={this.handleChange}
          ml={ml}
          comments={comments}
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          note={note}
          endDate={endDate}
        />
        {this.renderClose()}
        <TouchableOpacity
          onPress={this.handleCloseBottom}
          style={styles.close}
        >
          <Text style={styles.buttonText}>{polyglot.t('save')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>)
  }

  render () {
    const { type } = this.state
    return (
      <View style={styles.container}>
        {type ? this.renderOptions(type)
          : (
            <View style={{ justifyContent: 'center' }}>
              <FlatList
                data={menuList}
                keyExtractor={item => item}
                renderItem={this.renderMenuItem}
              />
            </View>
          )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingVertical: 30,
    paddingTop: 50
  },
  optionContainer: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginHorizontal: 20,
    paddingHorizontal: 20
  },
  textOption: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  close: {
    width: 160,
    height: 50,
    backgroundColor: colors.activeColor,
    marginBottom: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  editingTitle: {
    flex: 1,
    marginTop: 20,
    fontSize: 22,
    color: colors.primaryTextColor,
    textAlign: 'center'
  },
  cancel: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: colors.feedColor,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 48
  }
})
