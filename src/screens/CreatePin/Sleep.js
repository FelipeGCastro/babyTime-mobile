import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from 'src/constants'
import { Comments, Option, TimeInputs, OneOption } from './items'

const options = ['baby', 'mom']

const Sleep = ({
  comments, onHandleChange, option, startTime,
  startDate,
  endTime,
  endDate,
  timer,
  editing
}) => {
  const renderItem = item => {
    return (
      <Option key={item} onHandleChange={onHandleChange} itemColor={colors.sleepColor} item={item} option={option} />
    )
  }

  return (
    <View
      style={[styles.container, { justifyContent: option ? 'space-between' : 'flex-end' }]}
    >
      {option ? (
        <>
          <OneOption onHandleChange={onHandleChange} itemColor={colors.sleepColor} item={option} option={option} />
          <TimeInputs
            onHandleChange={onHandleChange}
            startTime={startTime}
            timer={timer}
            type='sleep'
            startDate={startDate}
            endTime={endTime}
            endDate={endDate}
          />
          <Comments comments={comments} onHandleChange={onHandleChange} />
        </>
      )
        : (
          <View style={styles.optionsContainer}>
            {options.map(renderItem)}
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 10,
    paddingBottom: 30
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})

export default Sleep
