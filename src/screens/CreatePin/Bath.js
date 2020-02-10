import React from 'react'
import { View, StyleSheet } from 'react-native'
// import { colors } from 'src/constants'
import { Comments, TimeInputs } from './items'

const Bath = ({ comments, onHandleChange, option }) => {
  return (
    <View
      style={styles.container}
    >
      <TimeInputs />
      <Comments comments={comments} onHandleChange={onHandleChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  }
})

export default Bath
