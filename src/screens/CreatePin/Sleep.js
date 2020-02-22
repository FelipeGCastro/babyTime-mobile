import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from 'src/constants'
import { Comments, Option, TimeInputs } from './items'
import Baby from 'src/assets/baby.png'
import Woman from 'src/assets/woman.png'

const options = [
  { id: 1, value: 'baby', label: 'Bebê', icon: Baby },
  { id: 2, value: 'mom', label: 'Mãe', icon: Woman }
]

const Sleep = ({
  comments, onHandleChange, option, startTime,
  startDate,
  endTime,
  endDate
}) => {
  const renderItem = item => {
    return (
      <Option key={item.id} onHandleChange={onHandleChange} itemColor={colors.sleepColor} item={item} option={option} />
    )
  }

  return (
    <View
      style={[styles.container, { justifyContent: option ? 'space-between' : 'flex-end' }]}
    >
      {option ? (
        <>
          <Option key={option.id} onHandleChange={onHandleChange} itemColor={colors.sleepColor} item={option} option={option} />
          <TimeInputs
            onHandleChange={onHandleChange}
            startTime={startTime}
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
