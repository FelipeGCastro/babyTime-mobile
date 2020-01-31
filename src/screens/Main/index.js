import React, { Component } from 'react'
import { Animated, View, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image, Text, Dimensions } from 'react-native'
import { colors } from 'src/constants'
import Diaper from 'src/assets/diaper.png'
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

  handleHorizontalPress = () => {
    const { horizontalActive } = this.state
    const finalValue = !horizontalActive ? 0 : 100
    Animated.timing(this.state.horizontalAnimation, {
      toValue: finalValue,
      duration: 900
    }).start()
    this.setState({ horizontalActive: !horizontalActive })
  }

  handlePinPress = () => {
    const { verticalActive } = this.state
    const finalValue = !verticalActive ? 0 : 100
    Animated.timing(this.state.verticalAnimation, {
      toValue: finalValue,
      duration: 900
    }).start()
    this.setState({ verticalActive: !verticalActive })
  }

  handler = ({ window }) => this.setState({ height: window.height, width: window.width })

  renderTimeLine = ({ item }) => (
    <View style={styles.pinTimeContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.leftTitle}>{item.time.start}</Text>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={this.handleHorizontalPress} style={styles.timeIconContainer}>
          <Image source={Diaper} resizeMode='contain' style={styles.pinTimeIcon} />
        </TouchableOpacity>
        <View style={styles.arrowDown} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.rightTitle}>{item.title}</Text>
      </View>
    </View>
  )

  handlePinTransform = () => ({
    transform: [
      {
        translateY: this.state.verticalAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [-(this.state.height / 2), this.state.height]
        })
      }
    ]
  })

  handleExtraTransform = () => ({
    transform: [
      {
        translateX: this.state.horizontalAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [-(this.state.width / 2), this.state.width]
        })
      }
    ]
  })

  handleVerticalTransform = () => ({
    transform: [
      {
        translateY: this.state.verticalAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [-(this.state.height / 2), (this.state.height / 2)]
        })
      }
    ]
  })

  handleHorizontalTransform = () => ({
    transform: [
      {
        translateX: this.state.horizontalAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [-(this.state.width / 2), (this.state.width / 2)]
        })
      }
    ]
  })

  render () {
    const { height, width } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
        <Animated.View style={[styles.mainContainer, { height }, this.handleVerticalTransform()]}>
          <Animated.View style={[styles.timeLineContainer, { width }, this.handleHorizontalTransform()]}>
            <FlatList
              data={timeLine}
              inverted
              keyExtractor={item => item.id.toString()}
              renderItem={this.renderTimeLine}
              showsVerticalScrollIndicator={false}
              ListHeaderComponentStyle={{ marginTop: 120 }}
              ListHeaderComponent={() => <View style={{ height: 200 }} />}
            />
            <ButtonsActions onPinPress={this.handlePinPress} />
          </Animated.View>
          <Animated.View style={[styles.sideContainer, { width }, this.handleExtraTransform()]}>
            <TouchableOpacity onPress={this.handleHorizontalPress}>
              <Text style={{
                color: colors.primaryTextColor
              }}
              >Pagina Vertical
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.pinPageContainer, { height }, this.handlePinTransform()]}>
          <CreatePin onPressPin={this.handlePinPress} />
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sideContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: -5
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeIconContainer: {
    width: 60,
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
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.diaperColor
  },
  leftContainer: {
    padding: 10
  },
  leftTitle: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  rightContainer: {
    padding: 10
  },
  rightTitle: {
    fontSize: 18,
    color: colors.primaryTextColor
  }
})
