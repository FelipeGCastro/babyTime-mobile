import React, { Component } from 'react'
import { Animated, View, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image, Text, Dimensions } from 'react-native'
import { colors } from 'src/constants'
import Diaper from 'src/assets/diaper.png'
import LeftClose from 'src/assets/leftClose.png'
import ButtonsActions from 'src/components/ButtonsActions'
import timeLine from 'src/temp/timeLine'
import CreatePin from 'src/screens/CreatePin'

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
    Dimensions.addEventListener('change', this.handler)
  }

  handleAnimationPress = (direction, position) => () => {
    const { horizontalActive, verticalActive, horizontalAnimation, verticalAnimation } = this.state
    const active = direction === 'vertical' ? verticalActive : horizontalActive
    const animation = direction === 'vertical' ? verticalAnimation : horizontalAnimation
    const duration = direction === 'vertical' ? 1300 : 900
    // const finalValue = !valueActive ? 0 : 100
    const finalValue = {
      half: !active ? 50 : 100,
      complete: !active ? 0 : 100
    }
    Animated.timing(animation, {
      toValue: finalValue[position],
      duration,
      useNativeDriver: true
    }).start()
    this.setState(direction === 'vertical'
      ? { verticalActive: !verticalActive }
      : { horizontalActive: !horizontalActive })
  }

  handler = ({ window }) => this.setState({ height: window.height, width: window.width })

  renderTimeLine = ({ item, index }) => (
    <View style={[
      styles.pinTimeContainer,
      { width: this.state.width },
      index % 2 === 0 && { flexDirection: 'row-reverse' }
    ]}
    >
      <View style={[styles.leftContainer, index % 2 !== 0 && { alignItems: 'flex-end' }]}>
        <Text style={styles.leftTitle}>{item.time.start}</Text>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.handleAnimationPress('horizontal', 'half')} style={styles.timeIconContainer}>
          <Image source={Diaper} resizeMode='contain' style={styles.pinTimeIcon} />
        </TouchableOpacity>
        <View style={[styles.arrowDown, index === 0 && styles.arrowDownRound]} />
      </View>
      <View style={[styles.rightContainer, index % 2 === 0 && { alignItems: 'flex-end' }]}>
        <Text style={styles.rightTitle}>{item.title}</Text>
      </View>
    </View>
  )

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
        startValue: height,
        axio: 'translateY',
        inputRange: [25, 100]
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

  render () {
    const { height, width, verticalActive } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
        <Animated.View style={[styles.mainContainer, { height }, this.handleTransform('vertical')]}>
          <Animated.View style={[styles.timeLineContainer, { width }, this.handleTransform('horizontal')]}>
            <FlatList
              data={timeLine}
              inverted
              keyExtractor={item => item.id.toString()}
              renderItem={this.renderTimeLine}
              showsVerticalScrollIndicator={false}
              ListHeaderComponentStyle={{ marginTop: 120 }}
              ListHeaderComponent={() => <View style={{ height: 200 }} />}
            />
            <ButtonsActions
              active={verticalActive}
              onPinPress={this.handleAnimationPress('vertical', 'half')}
            />
          </Animated.View>
          <Animated.View style={[styles.sideContainer, { width }, this.handleTransform('side')]}>
            <TouchableOpacity
              style={styles.leftArrowButton}
              onPress={this.handleAnimationPress('horizontal', 'half')}
            >
              <Image source={LeftClose} resizeMode='contain' style={styles.leftArrowIcon} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.pinPageContainer, { height }, this.handleTransform('below')]}>
          <CreatePin />
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
    paddingTop: 40,
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
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftArrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    paddingRight: 5,
    paddingVertical: 5,
    paddingLeft: 10,
    borderColor: colors.primaryTextColor,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: -18
  },
  leftArrowIcon: {
    transform: [
      { rotateZ: '180deg' }
    ],
    width: 35,
    height: 35
  },
  pinTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: -5
  },
  timeIconContainer: {
    width: 60,
    paddingTop: 5,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: colors.diaperColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinTimeIcon: {
    width: 40
  },
  arrowDown: {
    height: 70,
    width: 15,
    marginTop: -2,
    backgroundColor: colors.diaperColor
  },
  arrowDownRound: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  centerContainer: {
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    padding: 10
  },
  leftTitle: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  rightContainer: {
    flex: 1,
    padding: 10
  },
  rightTitle: {
    fontSize: 18,
    color: colors.primaryTextColor
  }
})
