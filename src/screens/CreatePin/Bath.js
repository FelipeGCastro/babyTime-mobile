import React from 'react'
import { View, StyleSheet } from 'react-native'
// import { colors } from 'src/constants'
import { Comments, TimeInputs } from './items'

const Bath = ({ comments, onHandleChange, startTime, startDate, endTime, endDate, timer }) => {
  return (
    <View
      style={styles.container}
    >
      <TimeInputs
        onHandleChange={onHandleChange}
        startTime={startTime}
        timer={timer}
        type='bath'
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
      />
      <Comments comments={comments} onHandleChange={onHandleChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingBottom: 30
  }
})

export default Bath
