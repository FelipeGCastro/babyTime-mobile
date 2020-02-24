import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Animated } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import v4 from 'uuid/v4'
import { colors, polyglot, icons } from 'src/constants'
import { Options } from 'src/components'

const menuList = [
  'feed',
  'sleep',
  'diaper',
  'note',
  'bath'
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
    const optionObj = {
      note: 'note',
      bath: 'bath'
    }
    if (!checked) {
      onAnimatedPress('vertical', position)
      setTimeout(() => {
        this.animationMenu(800)
        this.setState({ checked: item, option: optionObj[item] || false })
      }, 400)
    } else {
      this.animationMenu()
      this.setState({ checked: item, option: optionObj[item] || false })
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

  handleClosoBottom = async () => {
    const { checked, comments, option, note, startTime, startDate, endTime, endDate, ml } = this.state
    const { onAnimatedPress, onCreatePin } = this.props
    const pinsObj = { id: v4(), type: checked, comments, option, startTime, startDate, note, endDate, endTime, ml }
    try {
      const value = await AsyncStorage.getItem('@storage_Pins')
      let newPin = JSON.parse(value)
      if (!newPin) {
        newPin = []
      }
      newPin.push(pinsObj)
      await AsyncStorage.setItem('@storage_Pins', JSON.stringify(newPin))
      console.log(newPin)
      onCreatePin('pins')(newPin.reverse())
      onAnimatedPress('vertical', 'close')
      setTimeout(() => {
        this.setState({ checked: false })
      }, 800)
    } catch (e) {
      console.log(e)
    }
  }

  renderMenuItem = ({ item, index }) => {
    const { checked } = this.state
    return (
      <TouchableOpacity
        onPress={this.handleMenuItemPress(item, 'complete')}
        activeOpacity={0.7}
        style={[styles.buttonContainer,
          item === checked && { borderBottomColor: colors[item], borderBottomWidth: 2 }]}
      >
        <View style={[styles.iconContainer, { borderColor: colors[item] }]}>
          <Image source={icons[item]} resizeMode='contain' style={styles.menuIcon} />
        </View>
        <Text style={{ fontSize: 16, marginBottom: 10, color: colors.primaryTextColor }}>{polyglot.t(item)}</Text>
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

  renderOptions = (item) => {
    const { comments, option, note, startTime, startDate, endTime, endDate, ml } = this.state
    return (
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
      />)
  }

  verification = (checked) => {
    const {
      option,
      startTime,
      startDate,
      note
    } = this.state
    const verifyObj = {
      note: !!(option) && !!(startTime) && !!(startDate) && !!(note),
      default: !!(option) && !!(startTime) && !!(startDate)
    }
    const verified = verifyObj[checked] === undefined ? verifyObj.default : verifyObj[checked]

    return verified
  }

  render () {
    const { checked } = this.state
    const verification = this.verification(checked)
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, { flexGrow: 1 }]}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ justifyContent: 'center' }}>
          <FlatList
            data={menuList}
            keyExtractor={item => item}
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
        {verification ? (
          <Animated.View style={[this.objAnimation()]}>
            <TouchableOpacity
              onPress={this.handleClosoBottom}
              style={styles.close}
            ><Text style={styles.buttonText}>{polyglot.t('conclude')}</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : null}
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
