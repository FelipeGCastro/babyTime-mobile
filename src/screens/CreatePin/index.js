import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Animated } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { colors, polyglot } from 'src/constants'
import Feed from './Feed'
import SleepScreen from './Sleep'
import DiaperScreen from './Diaper'
import NoteScreen from './Note'
import BathScreen from './Bath'
import Breast from 'src/assets/breast.png'
import Sleep from 'src/assets/sleep.png'
import Diaper from 'src/assets/diaper.png'
import Note from 'src/assets/note.png'
import Bath from 'src/assets/duck.png'

const menuList = [
  { id: 1, color: colors.feedColor, icon: Breast, label: 'Alimentação', value: 'feed' },
  { id: 2, color: colors.sleepColor, icon: Sleep, label: 'Sono', value: 'sleep' },
  { id: 3, color: colors.diaperColor, icon: Diaper, label: 'Fralda', value: 'diaper' },
  { id: 4, color: colors.noteColor, icon: Note, label: 'Anotação', value: 'note' },
  { id: 5, color: colors.bathColor, icon: Bath, label: 'Banho', value: 'bath' }
]
export default class CreatePin extends Component {
  state = {
    checked: false,
    animation: new Animated.Value(0),
    comments: '',
    option: false,
    startTime: new Date(),
    startDate: new Date(),
    endTime: null,
    endDate: null,
    note: ''
  }

  handleMenuItemPress = (item, position) => () => {
    const { onAnimatedPress } = this.props
    const { checked } = this.state
    if (!checked) {
      onAnimatedPress('vertical', position)
      setTimeout(() => {
        this.animationMenu(800)
        this.setState({ checked: item, option: item === 'note' || item === 'bath' })
      }, 400)
    } else {
      this.animationMenu()
      this.setState({ checked: item, option: item === 'note' || item === 'bath' })
    }
  }

  animationMenu = (duration = 500) => {
    const { animation } = this.state
    animation.setValue(0)
    const finalValue = 100
    Animated.timing(animation, {
      toValue: finalValue,
      duration
    }).start()
  }

  handleClosoBottom = () => {
    const { onAnimatedPress } = this.props
    onAnimatedPress('vertical', 'close')
    setTimeout(() => {
      this.setState({ checked: false })
    }, 800)
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

  handleChange = name => value => {
    this.setState({ [name]: value })
    if (name === 'option') { this.animationMenu() }
  }

  objAnimation = () => ({
    opacity: this.state.animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    }),
    transform: [{
      translateY: this.state.animation.interpolate({
        inputRange: [0, 100],
        outputRange: [40, 0]
      })
    }]
  })

  renderOptions = (checked) => {
    const { comments, option, note, startTime, startDate, endTime, endDate, ml } = this.state
    const optionsObj = {
      feed: (
        <Feed
          option={option}
          onHandleChange={this.handleChange}
          ml={ml}
          comments={comments}
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          endDate={endDate}
        />),
      sleep: (
        <SleepScreen
          option={option}
          comments={comments}
          startTime={startTime}
          startDate={startDate}
          onHandleChange={this.handleChange}
        />),
      diaper: (
        <DiaperScreen
          option={option}
          onHandleChange={this.handleChange}
          comments={comments}
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          endDate={endDate}
        />),
      note: (
        <NoteScreen
          onHandleChange={this.handleChange}
          note={note}
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          endDate={endDate}
        />),
      bath: (
        <BathScreen
          option={option}
          onHandleChange={this.handleChange}
          comments={comments}
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          endDate={endDate}
        />
      )
    }
    return optionsObj[checked]
  }

  verification = () => {
    const {
      checked,
      option,
      startTime,
      startDate,
      note
    } = this.state
    const verifyObj = {
      note: !!(option) && !!(startTime) && !!(startDate) && !!(note),
      default: !!(option) && !!(startTime) && !!(startDate)
    }
    console.log(verifyObj[checked] || verifyObj.default)
    return verifyObj[checked] || verifyObj.default
  }

  render () {
    const { checked } = this.state
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, { flexGrow: 1 }]}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ justifyContent: 'center' }}>
          <FlatList
            data={menuList}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderMenuItem}
            horizontal
          />
        </View>
        <View />
        {checked && (
          <Animated.View style={[{ flex: 1 }, this.objAnimation()]}>
            {this.renderOptions(checked)}
          </Animated.View>
        )}
        {this.verification() && (
          <Animated.View style={[this.objAnimation()]}>
            <TouchableOpacity
              onPress={this.handleClosoBottom}
              style={styles.close}
            ><Text style={styles.buttonText}>{polyglot.t('conclude')}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  // PIN PAGE CONTAINER
  container: {
    justifyContent: 'space-between',
    paddingVertical: 20
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
  }

  // TERMINA AQUI
})
