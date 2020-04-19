import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Animated,
  LayoutAnimation,
  View, StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  Alert
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import { colors, getData, icons, changePins, removePin } from 'src/constants'
import ButtonsActions from 'src/components/ButtonsActions'
import CreatePin from 'src/screens/CreatePin'
import SideScreen from 'src/screens/SideScreen'
import TimeLine from './TimeLine'
import { MainActions } from 'src/redux'

export default function Main () {
  const [width, setWidth] = useState(Dimensions.get('window').width)
  const [height, setHeight] = useState(Dimensions.get('window').height)
  const {
    verticalAnimation,
    horizontalAnimation,
    verticalActive,
    horizontalActive,
    pinsSelected,
    editing,
    pins,
    list,
    timer,
    second
  } = useSelector(state => state.main)
  const dispatch = useDispatch()

  useEffect(() => {
    Dimensions.addEventListener('change', handler)
    handleSetDataToState('all')
    return () => {
      Dimensions.removeEventListener('change', handler)
    }
  }, [])

  const handleTimerPress = useCallback(() => {
    if (timer) {
      handleStopTimer()
    } else {
      handleStartTimer()
      if (second === 0 && (verticalActive === 100)) {
        handleAnimationPress('vertical', 'half')
      }
    }
    dispatch(MainActions.handleChange('timer', !timer))
  }, [dispatch])

  const handleStartTimer = () => {
    // if (Platform.OS === 'ios') {
    //   BackgroundTimer.start()
    // }
    BackgroundTimer.runBackgroundTimer(() => {
      dispatch(MainActions.addSec())
      if (Platform.OS === 'ios') {
        LayoutAnimation.easeInEaseOut()
      }
    }, 1000)
  }

  const handleResetTimer = () => {
    dispatch(MainActions.handleChange('second', 0))
    dispatch(MainActions.handleChange('timer', false))
    BackgroundTimer.stopBackgroundTimer()
  }

  const handleStopTimer = () => {
    BackgroundTimer.stopBackgroundTimer()
  }

  const handleSetDataToState = async (type = false) => {
    const pins = await getData(type)
    if (pins === 'error') {
      Alert.alert(
        'Algo Deu errado',
        'Aconteceu um erro ao buscar os seus pins, tente novamente mais tarde!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    } else {
      !!pins && dispatch(MainActions.handleChange('pins', pins))
    }
  }

  const handleEditingPins = async item => {
    const result = await changePins(item)
    result && handleSetDataToState(pinsSelected)
  }

  const handleRemovePin = async id => {
    const result = await removePin(id)
    result && handleSetDataToState(pinsSelected)
  }

  const handler = useCallback(({ window }) => {
    setHeight(window.height)
    setWidth(window.width)
  }, [setHeight, setWidth])

  const handleAnimationPress = useCallback((direction, position) => {
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
        // if (direction === 'vertical') {
        //   handleResetTimer()
        // }
        if (direction === 'horizontal') {
          dispatch(MainActions.handleChange('editing', false))
        }
      }
    })
    dispatch(MainActions.handleChange(direction === 'vertical' ? 'verticalActive' : 'horizontalActive', finalValue[position]))
  }, [dispatch, verticalActive, verticalAnimation, horizontalActive, horizontalAnimation])

  const handleTransform = useCallback((name) => {
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
  }, [horizontalAnimation, verticalAnimation])

  function renderMiddleArrow (side = false) {
    return (
      <TouchableOpacity
        style={[styles.ArrowButton,
          styles.rightArrow,
          side && { bottom: height / 2.7 }]}
        onPress={() => side ? handleMenuItemPress('all') : handleAnimationPress('horizontal', 'half')}
      >
        {side ? <Image source={icons.allMenu} resizeMode='contain' style={styles.allMenuIcon} />
          : <Image source={icons.leftArrow} resizeMode='contain' style={styles.rightArrowIcon} />}
      </TouchableOpacity>
    )
  }

  const handleChange = useCallback(name => value => {
    dispatch(MainActions.handleChange(name, value))
  }, [dispatch])

  const handleMenuItemPress = async value => {
    handleSetDataToState(value)
    value !== 'all' && LayoutAnimation.easeInEaseOut()
    dispatch(MainActions.handleChange('pinsSelected', value))
    handleAnimationPress('horizontal', 'close')
  }

  const handleCloseEverthing = useCallback(() => {
    horizontalActive !== 100 && handleAnimationPress('horizontal', 'close')
    verticalActive !== 100 && handleAnimationPress('vertical', 'close')
  }, [horizontalActive, verticalActive])

  function renderFullScreenButton (verticalActive, horizontalActive) {
    const checkActive = verticalActive !== 100 || horizontalActive !== 100
    return checkActive && (
      <TouchableOpacity
        onPress={handleCloseEverthing}
        style={[
          styles.fullScreenButton,
          { height, width },
          horizontalActive !== 100 && { zIndex: 5 }
        ]}
        activeOpacity={0.7}
      />
    )
  }

  function renderTimeLineIcon () {
    return (
      <TouchableOpacity
        style={styles.timeLineButton}
        activeOpacity={0.7}
        onPress={() => dispatch(MainActions.handleChange('list', !list))}
      >
        <Image source={list ? icons.timeLine : icons.timeLineList} resizeMode='contain' style={styles.timeLineIcon} />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
      <Animated.View style={[styles.mainContainer, { height }, handleTransform('vertical')]}>
        <Animated.View style={[styles.timeLineContainer, { width }, handleTransform('horizontal')]}>
          <TimeLine
            pins={pins}
            width={width}
            onChange={handleChange}
            list={list}
            pinsSelect={pinsSelected}
            onAnimationPress={handleAnimationPress}
          />

          {pinsSelected !== 'all' && renderMiddleArrow(true)}
          {renderMiddleArrow()}

          <ButtonsActions
            active={verticalActive !== 100}
            second={second}
            timer={timer}
            onTimerPress={handleTimerPress}
            onPinPress={handleAnimationPress}
          />
          {renderTimeLineIcon()}
          {renderFullScreenButton(verticalActive, horizontalActive)}
        </Animated.View>

        <Animated.View style={[styles.sideContainer, { width }, handleTransform('side')]}>
          <SideScreen
            editing={editing}
            onChange={handleChange}
            onRemovePin={handleRemovePin}
            onEditingChange={handleEditingPins}
            horizontalActive={horizontalActive}
            onAnimatedPress={handleAnimationPress}
            onItemPress={handleMenuItemPress}
          />
        </Animated.View>

      </Animated.View>
      <Animated.View style={[styles.pinPageContainer, { height }, handleTransform('below')]}>

        <CreatePin
          onTimerPress={handleTimerPress}
          second={second}
          timer={timer}
          onResetTimer={handleResetTimer}
          verticalActive={verticalActive}
          onAnimatedPress={handleAnimationPress}
          onCreatePin={handleSetDataToState}
        />

      </Animated.View>
    </View>
  )
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
  timeLineButton: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    right: 15,
    top: 30,
    borderRadius: 25,
    backgroundColor: colors.backgroundColor,
    borderColor: colors.primaryTextColor,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  timeLineIcon: {
    width: 45,
    height: 45
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
    marginLeft: 3,
    width: 25
  },
  fullScreenButton: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})
