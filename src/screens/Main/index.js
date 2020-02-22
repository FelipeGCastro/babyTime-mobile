import React, { Component } from 'react'
import { Animated, View, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native'
import { colors } from 'src/constants'
import LeftClose from 'src/assets/leftClose.png'
import ButtonsActions from 'src/components/ButtonsActions'
import timeLine from 'src/temp/timeLine'
import CreatePin from 'src/screens/CreatePin'
import SideScreen from 'src/screens/SideScreen'
import TimeLineItem from './TimeLineItem'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      verticalAnimation: new Animated.Value(100),
      horizontalAnimation: new Animated.Value(100),
      verticalActive: false,
      horizontalActive: false
    }
  }

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.handler)
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
      half: !active ? 50 : 100,
      complete: active ? 0 : 100
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
        startValue: width,
        axio: 'translateX',
        inputRange: [25, 100]
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

  renderTimeLine = ({ item, index }) => (
    <TimeLineItem
      item={item}
      index={index}
      width={this.state.width}
      onItemPress={this.handleAnimationPress}
    />
  )

  renderTimeLineContainer = verticalActive => (
    <Animated.View style={[styles.timeLineContainer, { width: this.state.width }, this.handleTransform('horizontal')]}>
      <FlatList
        data={timeLine}
        inverted
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderTimeLine}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ marginTop: 60 }}
        ListHeaderComponent={() => <View style={{ height: 150 }} />}
      />
      {this.renderLeftArrow()}
      <ButtonsActions
        active={verticalActive}
        onPinPress={() => this.handleAnimationPress('vertical', 'half')}
      />
    </Animated.View>
  )

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

  renderSideContainer = () => (
    <Animated.View style={[styles.sideContainer, { width: this.state.width }, this.handleTransform('side')]}>
      <SideScreen onAnimatedPress={this.handleAnimationPress} />
    </Animated.View>
  )

  render () {
    const { height, verticalActive } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
        <Animated.View style={[styles.mainContainer, { height }, this.handleTransform('vertical')]}>

          {this.renderTimeLineContainer(verticalActive)}

          {this.renderSideContainer(verticalActive)}

        </Animated.View>
        <Animated.View style={[styles.pinPageContainer, { height }, this.handleTransform('below')]}>

          <CreatePin onAnimatedPress={this.handleAnimationPress} />

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
