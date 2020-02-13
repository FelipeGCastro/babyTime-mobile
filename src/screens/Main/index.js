import React, { Component } from 'react'
import { Animated, View, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image, Text, Dimensions } from 'react-native'
import { colors } from 'src/constants'
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
    <View style={[
      styles.pinTimeContainer,
      { width: this.state.width },
      index % 2 === 0 && { flexDirection: 'row-reverse' }
    ]}
    >
      <View style={styles.leftContainer} />
      <View style={styles.centerContainer}>
        <View
          style={[styles.arrowDown,
            { backgroundColor: item.color },
            index === 0 && styles.arrowDownRound]}
        >
          <Image source={LeftClose} resizeMode='contain' style={styles.downIcon} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.handleAnimationPress('horizontal', 'half')}
        >
          <View style={[styles.timeIconContainer, { borderColor: item.color }]}>

            <Image source={item.icon} resizeMode='contain' style={styles.pinTimeIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.rightContainer, index % 2 === 0 && { alignItems: 'flex-end' }]}>
        <Text style={styles.timeTitle}>{item.time.start}</Text>
        <Text style={[styles.rightTitle, index % 2 === 0 && styles.alignTextRight]}>{item.time.duration}</Text>
        <Text style={[styles.rightTitle, index % 2 === 0 && styles.alignTextRight]}>{item.title}</Text>
      </View>
    </View>
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
      <ButtonsActions
        active={verticalActive}
        onPinPress={() => this.handleAnimationPress('vertical', 'half')}
      />
    </Animated.View>
  )

  renderSideContainer = () => (
    <Animated.View style={[styles.sideContainer, { width: this.state.width }, this.handleTransform('side')]}>
      <TouchableOpacity
        style={styles.leftArrowButton}
        onPress={() => this.handleAnimationPress('horizontal', 'half')}
      >
        <Image source={LeftClose} resizeMode='contain' style={styles.leftArrowIcon} />
      </TouchableOpacity>
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
    alignItems: 'flex-start'
  },
  timeIconContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    width: 60,
    padding: 5,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinTimeIcon: {
    width: 40
  },
  arrowDown: {
    flex: 1,
    marginBottom: -0.8,
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: 15,
    marginTop: -2
  },
  downIcon: {
    width: 15,
    height: 30,
    transform: [
      { rotateZ: '-90deg' }
    ]
  },
  arrowDownRound: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  centerContainer: {
    flexShrink: 1,
    height: 'auto',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    padding: 10
  },
  timeTitle: {
    fontSize: 20,
    marginBottom: 3,
    color: colors.primaryTextColor
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20
  },
  rightTitle: {
    fontSize: 14,
    marginBottom: 3,
    color: colors.secondaryTextColor
  },
  alignTextRight: {
    textAlign: 'right'
  }
})
