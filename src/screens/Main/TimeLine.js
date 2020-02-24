import React, { Component } from 'react'
import { View, FlatList, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native'
import TimeLineItem from './TimeLineItem'
import { colors } from 'src/constants'

export default class TimeLine extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  componentDidMount () {
    this.animationPins()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.pins !== this.props.pins) {
      this.animationPins()
    }
  }

  handleItemPress = item => {
    const { onAnimationPress, onChange } = this.props
    onChange('editing')(item)
    onAnimationPress('horizontal', 'complete')
  }

  renderTimeLine = ({ item, index }) => (
    <TimeLineItem
      item={item}
      index={index}
      width={this.props.width}
      onItemPress={this.handleItemPress}
    />
  )

  animationPins = (duration = 500) => {
    const { animation } = this.state
    animation.setValue(0)
    const finalValue = 100
    Animated.timing(animation, {
      toValue: finalValue,
      duration
    }).start()
  }

  objAnimation = () => ({
    opacity: this.state.animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    }),
    transform: [{
      translateY: this.state.animation.interpolate({
        inputRange: [0, 100],
        outputRange: [-80, 0]
      })
    }]
  })

  render () {
    const { pins } = this.props
    return (
      <Animated.View style={[styles.listContainer, this.objAnimation()]}>
        {pins.length === 0
          ? (
            <TouchableOpacity>
              <Text style={styles.noPinsText}>Ainda não tens Pins</Text>
            </TouchableOpacity>
          )
          : (
            <FlatList
              data={pins}
              inverted
              keyExtractor={item => item.id}
              renderItem={this.renderTimeLine}
              showsVerticalScrollIndicator={false}
              ListHeaderComponentStyle={{ marginTop: 60 }}
              ListHeaderComponent={() => <View style={{ height: 150 }} />}
            />
          )}

      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noPinsText: { fontSize: 18, color: colors.primaryTextColor }
})
