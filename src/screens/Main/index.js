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
      createPinAnimation: new Animated.Value(100),
      createPinChecked: false
    }
  }

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.handler)
  }

  componentWillUnmount = () => {
    Dimensions.addEventListener('change', this.handler)
  }

  handlePinPress = () => {
    const { createPinChecked } = this.state
    const finalValue = !createPinChecked ? 0 : 100
    Animated.timing(this.state.createPinAnimation, {
      toValue: finalValue,
      duration: 900
    }).start()
    this.setState({ createPinChecked: !createPinChecked })
  }

  handler = ({ window }) => this.setState({ height: window.height, width: window.width })

  renderTimeLine = ({ item }) => (
    <View style={styles.pinTimeContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.leftTitle}>{item.time.start}</Text>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={this.handlePinPress} style={styles.timeIconContainer}>
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
        translateY: this.state.createPinAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [-(this.state.height / 2), this.state.height]
        })
      }
    ]
  })

  handleMainTransform = () => ({
    transform: [
      {
        translateY: this.state.createPinAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [-(this.state.height / 2), (this.state.height / 2)]
        })
      }
    ]
  })

  render () {
    const { height, width } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle='light-content' />
        <Animated.View style={[styles.mainContainer, { height }, this.handleMainTransform()]}>
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
        <Animated.View style={[styles.pinPageContainer, { height, width }, this.handlePinTransform()]}>
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
