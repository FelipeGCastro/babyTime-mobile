import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Animated } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'
import v4 from 'uuid/v4'
import { colors, polyglot, icons } from 'src/constants'
import { Options, TimerButton } from 'src/components'

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
    startTime: null,
    startDate: null,
    endTime: null,
    endDate: null,
    duration: null,
    note: ''
  }

  handleMenuItemPress = (item, position) => () => {
    const { onAnimatedPress } = this.props
    const { checked } = this.state
    const startTime = new Moment(new Date()).format('HH:mm')
    const startDate = new Moment(new Date()).format('DD/MM/YYYY')
    const optionObj = {
      note: 'note',
      bath: 'bath'
    }
    if (!checked) {
      onAnimatedPress('vertical', position)
      setTimeout(() => {
        this.animationMenu(800)
        this.setState({ checked: item, startTime, startDate, option: optionObj[item] || false })
      }, 400)
    } else {
      this.animationMenu()
      this.setState({ checked: item, startTime, startDate, option: optionObj[item] || false })
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

  handleCloseBottom = async () => {
    const { checked, comments, option, note, startTime, startDate, endTime, endDate, ml, duration } = this.state
    const { onAnimatedPress, onCreatePin } = this.props
    var inSec = false
    if (endTime && endDate) {
      const now = startDate + ' ' + startTime
      const then = endDate + ' ' + endTime
      var ms = Moment(now, 'DD/MM/YYYY HH:mm').diff(Moment(then, 'DD/MM/YYYY HH:mm'))
      var d = Moment.duration(ms)
      var s = Math.floor(d.asHours()) + Moment.utc(ms).format('HH:mm:ss')
      inSec = Moment(s, 'HH:mm:ss').diff(Moment().startOf('day'), 'seconds')
    }

    const finalDuration = duration || inSec
    const pinsObj = {
      id: v4(),
      type: checked,
      comments,
      option,
      duration: finalDuration,
      startTime,
      startDate,
      note,
      endDate: endDate || null,
      endTime: endTime || null,
      ml
    }
    try {
      const value = await AsyncStorage.getItem('@storage_Pins')
      let newPin = JSON.parse(value)
      if (!newPin) {
        newPin = []
      }
      newPin.push(pinsObj)
      await AsyncStorage.setItem('@storage_Pins', JSON.stringify(newPin))
      onCreatePin()
      onAnimatedPress('vertical', 'close')
      setTimeout(() => {
        this.resetState()
      }, 800)
    } catch (e) {
      console.log(e)
    }
  }

  resetState = () => {
    this.setState({
      checked: false,
      comments: '',
      option: false,
      startTime: null,
      startDate: null,
      endTime: null,
      endDate: null,
      note: ''
    })
  }

  handleJustClose = () => {
    const { onAnimatedPress } = this.props
    onAnimatedPress('vertical', 'close')
    setTimeout(() => {
      this.resetState()
    }, 800)
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

  renderOptions = (item, second) => {
    const { comments, option, note, startTime, startDate, endTime, endDate, ml } = this.state
    return (
      <Options
        item={item}
        timer={!!second}
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

  renderClose = () => (

    <TouchableOpacity
      onPress={this.handleJustClose}
      style={styles.cancel}
    >
      <Text style={styles.buttonText}>X</Text>
    </TouchableOpacity>
  )

  renderPauseAndStart = () => {
    const { onTimerPress, timer } = this.props
    return (
      <TimerButton onTimerPress={onTimerPress} timer={timer} />
    )
  }

  handleTimerFinish = () => {
    const { onTimerPress, second } = this.props
    onTimerPress()
    this.setState({ duration: second }, this.handleCloseBottom)
  }

  renderConclude = (checked, second) => {
    const verification = this.verification(checked)
    return (
      <Animated.View style={[{
        height: 50,
        marginBottom: 10
      }, this.objAnimation()]}
      >
        {verification && (
          <TouchableOpacity
            onPress={second ? this.handleTimerFinish : this.handleCloseBottom}
            style={styles.conclude}
          ><Text style={styles.buttonText}>{second ? polyglot.t('finish') : polyglot.t('conclude')}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    )
  }

  render () {
    const { checked } = this.state
    const { second } = this.props
    const secondTimer = Moment('1900-01-01 00:00:00')
      .add(second, 'seconds').format(second > 3599 ? 'HH:mm:ss' : 'mm:ss')
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, !!second && { justifyContent: 'flex-start' }]}
        extraScrollHeight={40}
        keyboardShouldPersistTaps='handled'
      >
        {!!second && (
          <Text
            style={styles.timerText}
          >{secondTimer}
          </Text>)}
        <View style={styles.principalMenu}>
          <FlatList
            data={menuList}
            keyExtractor={item => item}
            renderItem={this.renderMenuItem}
            horizontal
          />
        </View>
        <View />
        {checked && (
          <Animated.View style={[{ flexGrow: 1 }, this.objAnimation()]}>
            {this.renderOptions(checked, second)}
          </Animated.View>
        )}
        {this.renderConclude(checked, second)}
        {this.renderClose()}
        {!!second && this.renderPauseAndStart()}
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  // PIN PAGE CONTAINER
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  principalMenu: {
    justifyContent: 'center',
    marginVertical: 15
  },
  menuIcon: {
    width: 35
  },
  timerText: {
    fontSize: 45,
    color: colors.primaryTextColor,
    textAlign: 'center',
    marginBottom: 20
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
    bottom: 30
  },
  conclude: {
    width: 160,
    height: 50,
    backgroundColor: colors.activeColor,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  stop: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primaryTextColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    margin: 10
  }

  // TERMINA AQUI
})
