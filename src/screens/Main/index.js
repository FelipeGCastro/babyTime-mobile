import React, { Component } from 'react'
import {
  Animated,
  LayoutAnimation,
  View, StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  UIManager
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import { colors, getData, icons, changePins, removePin } from 'src/constants'
import ButtonsActions from 'src/components/ButtonsActions'
import CreatePin from 'src/screens/CreatePin'
import SideScreen from 'src/screens/SideScreen'
import TimeLine from './TimeLine'
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      verticalAnimation: new Animated.Value(100),
      horizontalAnimation: new Animated.Value(100),
      verticalActive: 100,
      horizontalActive: 100,
      pinsSelected: 'all',
      editing: false,
      pins: [],
      timer: false,
      second: 0
    }
  }

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.handler)
    this.handleSetDataToState('all')
  }

  _interval: any

  handleTimerPress = () => {
    const { timer, second, verticalActive } = this.state
    if (timer) {
      this.handleStopTimer()
    } else {
      this.handleStartTimer()
      if (second === 0 && (verticalActive === 100)) {
        this.handleAnimationPress('vertical', 'half')
      }
    }
    this.setState({ timer: !timer })
  }

  handleStartTimer = () => {
    if (Platform.OS === 'ios') {
      BackgroundTimer.start()
    }
    this._interval = BackgroundTimer.setInterval(() => {
      this.setState({
        second: this.state.second + 1
      }, () => LayoutAnimation.easeInEaseOut())
    }, 1000)
  }

  handleResetTimer = () => {
    this.setState({ second: 0, timer: false })
    BackgroundTimer.clearInterval(this._interval)
  }

  handleStopTimer = () => {
    BackgroundTimer.clearInterval(this._interval)
  }

  handleSetDataToState = async (type = false) => {
    const pins = await getData(type)
    !!pins && this.setState({ pins })
  }

  handleChangePins = async (itemFilter) => {
    const pins = await getData()
    if (itemFilter === 'all') {
      this.setState({ pins })
    } else {
      const newPins = pins.filter((item, index) => {
        if (item.type === itemFilter) {
          return item
        }
      })
      this.setState({ pins: newPins })
    }
  }

  handleEditingPins = async item => {
    const result = await changePins(item)
    result && this.handleSetDataToState(this.state.pinsSelected)
  }

  handleRemovePin = async id => {
    const result = await removePin(id)
    result && this.handleSetDataToState(this.state.pinsSelected)
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.handler)
  }

  handler = ({ window }) => {
    this.setState({ height: window.height, width: window.width })
  }

  handleAnimationPress = (direction, position) => {
    const { horizontalActive, verticalActive, horizontalAnimation, verticalAnimation } = this.state
    const active = direction === 'vertical' ? verticalActive : horizontalActive
    const animation = direction === 'vertical' ? verticalAnimation : horizontalAnimation
    const duration = direction === 'vertical' ? 900 : 800
    const finalValue = {
      close: 100,
      half: active === 100 ? 50 : 100,
      complete: 0
    }

    Animated.timing(animation, {
      toValue: finalValue[position],
      duration,
      useNativeDriver: true
    }).start(() => {
      if (finalValue[position] === 100) {
        if (direction === 'vertical') {
          this.handleResetTimer()
        }
        if (direction === 'horizontal') {
          this.setState({ editing: false })
        }
      }
    })
    this.setState(direction === 'vertical'
      ? { verticalActive: finalValue[position] }
      : { horizontalActive: finalValue[position] })
  }

  handleTransform = (name) => {
    const { height, width, horizontalAnimation, verticalAnimation } = this.state
    const animationObj = {
      horizontal: {
        animation: horizontalAnimation,
        finalValue: -(width / 2),
        startValue: (width / 2),
        axio: 'translateX',
        inputRange: [0, 100]
      },
      vertical: {
        animation: verticalAnimation,
        finalValue: -(height / 2),
        startValue: (height / 2),
        axio: 'translateY',
        inputRange: [0, 100]
      },
      side: {
        animation: horizontalAnimation,
        finalValue: -(width / 2),
        startValue: width / 2,
        axio: 'translateX',
        inputRange: [0, 100]
      },
      below: {
        animation: verticalAnimation,
        finalValue: -(height / 2),
        startValue: height / 2,
        axio: 'translateY',
        inputRange: [0, 100]
      }
    }
    const { axio, animation, finalValue, startValue, inputRange } = animationObj[name]

    return ({
      transform: [
        {
          [axio]: animation.interpolate({
            inputRange,
            outputRange: [finalValue, startValue]
          })
        }
      ]
    })
  }

  renderMiddleArrow = (side = false) => {
    return (
      <TouchableOpacity
        style={[styles.ArrowButton, styles.rightArrow, side && { bottom: this.state.height / 2.7 }]}
        onPress={() => side ? this.handleMenuItemPress('all') : this.handleAnimationPress('horizontal', 'half')}
      >
        {side ? <Image source={icons.allMenu} resizeMode='contain' style={styles.allMenuIcon} />
          : <Image source={icons.leftArrow} resizeMode='contain' style={styles.rightArrowIcon} />}
      </TouchableOpacity>
    )
  }

  handleChange = name => value => {
    this.setState({ [name]: value })
  }

  handleMenuItemPress = async value => {
    this.handleSetDataToState(value)
    value !== 'all' && LayoutAnimation.easeInEaseOut()
    this.setState({ pinsSelected: value })
    this.handleAnimationPress('horizontal', 'close')
  }

  handleCloseEverthing = () => {
    const { verticalActive, horizontalActive } = this.state
    horizontalActive !== 100 && this.handleAnimationPress('horizontal', 'close')
    verticalActive !== 100 && this.handleAnimationPress('vertical', 'close')
  }

  renderFullScreenButton = () => {
    const { verticalActive, horizontalActive, height, width } = this.state
    const checkActive = verticalActive !== 100 || horizontalActive !== 100
    return checkActive && (
      <TouchableOpacity
        onPress={this.handleCloseEverthing}
        style={[
          styles.fullScreenButton,
          { height, width },
          horizontalActive !== 100 && { zIndex: 5 }
        ]}
        activeOpacity={0.7}
      />
    )
  }

  render () {
    const { height, timer, second, horizontalActive, verticalActive, pins, editing, width, pinsSelected } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
        <Animated.View style={[styles.mainContainer, { height }, this.handleTransform('vertical')]}>
          <Animated.View style={[styles.timeLineContainer, { width }, this.handleTransform('horizontal')]}>
            <TimeLine
              pins={pins}
              width={width}
              onChange={this.handleChange}
              pinsSelect={pinsSelected}
              onAnimationPress={this.handleAnimationPress}
            />

            {pinsSelected !== 'all' && this.renderMiddleArrow(true)}
            {this.renderMiddleArrow()}

            <ButtonsActions
              active={verticalActive !== 100}
              second={second}
              timer={timer}
              onTimerPress={this.handleTimerPress}
              onPinPress={this.handleAnimationPress}
            />
            {this.renderFullScreenButton()}
          </Animated.View>

          <Animated.View style={[styles.sideContainer, { width }, this.handleTransform('side')]}>
            <SideScreen
              editing={editing}
              onChange={this.handleChange}
              onRemovePin={this.handleRemovePin}
              onEditingChange={this.handleEditingPins}
              horizontalActive={horizontalActive}
              onAnimatedPress={this.handleAnimationPress}
              onItemPress={this.handleMenuItemPress}
            />
          </Animated.View>

        </Animated.View>
        <Animated.View style={[styles.pinPageContainer, { height }, this.handleTransform('below')]}>

          <CreatePin
            onTimerPress={this.handleTimerPress}
            second={second}
            timer={timer}
            verticalActive={verticalActive}
            onAnimatedPress={this.handleAnimationPress}
            onCreatePin={this.handleSetDataToState}
          />

        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinPageContainer: {
    paddingTop: 44,
    paddingBottom: 20
  },
  mainContainer: {
    flexDirection: 'row'
  },
  timeLineContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sideContainer: {
    flexGrow: 1
  },
  ArrowButton: {
    width: 50,
    height: 44,
    borderWidth: 1.5,
    paddingRight: 5,
    paddingVertical: 5,
    backgroundColor: colors.backgroundColor,
    borderColor: colors.primaryTextColor,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  leftArrow: {
    left: 0,
    borderBottomRightRadius: 22,
    borderTopRightRadius: 22,
    paddingLeft: 5,
    borderLeftWidth: 0
  },
  rightArrow: {
    right: 0,
    borderBottomLeftRadius: 22,
    borderTopLeftRadius: 22,
    paddingLeft: 10,
    borderRightWidth: 0
  },
  leftArrowIcon: {
    width: 35,
    height: 35
  },
  rightArrowIcon: {
    transform: [
      { rotateZ: '180deg' }
    ],
    width: 35,
    height: 35
  },
  allMenuIcon: {
    width: 30
  },
  fullScreenButton: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})
