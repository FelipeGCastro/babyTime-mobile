import React, { Component } from 'react'
import { Animated, View, StyleSheet, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { colors } from 'src/constants'
import LeftClose from 'src/assets/leftClose.png'
import ButtonsActions from 'src/components/ButtonsActions'
import CreatePin from 'src/screens/CreatePin'
import SideScreen from 'src/screens/SideScreen'
import TimeLine from './TimeLine'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      verticalAnimation: new Animated.Value(100),
      horizontalAnimation: new Animated.Value(100),
      verticalActive: false,
      horizontalActive: false,
      pinsSelect: 'all',
      editing: false,
      pins: []
    }
  }

  componentDidMount = async () => {
    Dimensions.addEventListener('change', this.handler)
    const pins = await this.getData()
    !!pins && this.setState({ pins })
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Pins')
      if (value !== null) {
        return JSON.parse(value).reverse()
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

  handleChangePins = async (itemFilter) => {
    const pins = await this.getData()
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

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.handler)
  }

  handler = ({ window }) => {
    this.setState({ height: window.height, width: window.width })
  }

  handleAnimationPress = (direction, position) => {
    const { horizontalActive, verticalActive, horizontalAnimation, verticalAnimation } = this.state
    console.log(horizontalActive, position)
    const active = direction === 'vertical' ? verticalActive : horizontalActive
    const animation = direction === 'vertical' ? verticalAnimation : horizontalAnimation
    const duration = direction === 'vertical' ? 900 : 800
    const finalValue = {
      close: 100,
      half: active ? 100 : 50,
      complete: 0
    }
    Animated.timing(animation, {
      toValue: finalValue[position],
      duration,
      useNativeDriver: true
    }).start()
    this.setState(direction === 'vertical'
      ? { verticalActive: position === 'complete' ? verticalActive : !verticalActive }
      : { horizontalActive: !horizontalActive })
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

  renderLeftArrow = () => {
    return (
      <TouchableOpacity
        style={styles.leftArrowButton}
        onPress={() => this.handleAnimationPress('horizontal', 'half')}
      >
        <Image source={LeftClose} resizeMode='contain' style={styles.leftArrowIcon} />
      </TouchableOpacity>
    )
  }

  handleChange = name => value => {
    this.setState({ [name]: value })
  }

  handleMenuItemPress = async value => {
    await this.handleChangePins(value)
    this.handleAnimationPress('horizontal', 'close')
  }

  render () {
    const { height, verticalActive, pins, editing, width, pinsSelect } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
        <Animated.View style={[styles.mainContainer, { height }, this.handleTransform('vertical')]}>
          <Animated.View style={[styles.timeLineContainer, { width }, this.handleTransform('horizontal')]}>
            <TimeLine pins={pins} width={width} onChange={this.handleChange} pinsSelect={pinsSelect} onAnimationPress={this.handleAnimationPress} />
            {this.renderLeftArrow()}
            <ButtonsActions
              active={verticalActive}
              onPinPress={() => this.handleAnimationPress('vertical', 'half')}
            />
          </Animated.View>

          <Animated.View style={[styles.sideContainer, { width: this.state.width }, this.handleTransform('side')]}>
            <SideScreen editing={editing} onItemPress={this.handleMenuItemPress} />
          </Animated.View>

        </Animated.View>
        <Animated.View style={[styles.pinPageContainer, { height }, this.handleTransform('below')]}>

          <CreatePin onAnimatedPress={this.handleAnimationPress} onCreatePin={this.handleChange} />

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
  leftArrowButton: {
    width: 50,
    height: 44,
    borderBottomLeftRadius: 22,
    borderTopLeftRadius: 22,
    borderRightWidth: 0,
    borderWidth: 1.5,
    paddingRight: 5,
    paddingVertical: 5,
    paddingLeft: 10,
    borderColor: colors.primaryTextColor,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-start',
    right: 0
  },
  leftArrowIcon: {
    transform: [
      { rotateZ: '180deg' }
    ],
    width: 35,
    height: 35
  }
})
