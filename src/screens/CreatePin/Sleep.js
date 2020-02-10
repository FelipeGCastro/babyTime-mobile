import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from 'src/constants'
import { Comments, Option } from './items'
import Baby from 'src/assets/baby.png'
import Woman from 'src/assets/woman.png'

const options = [
  { id: 1, value: 'baby', label: 'Bebê', icon: Baby },
  { id: 2, value: 'mom', label: 'Mãe', icon: Woman }
]

const Sleep = ({ comments, onHandleChange, option }) => {
  const renderItem = (item) => {
    return (
      <Option onHandleChange={onHandleChange} itemColor={colors.sleepColor} item={item} option={option} />
    )
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.options}>
        {options.map(renderItem)}
      </View>
      <Comments comments={comments} onHandleChange={onHandleChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 15
  },
  optionIcon: {
    width: 35
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    borderWidth: 3,
    width: 60,
    height: 60,
    borderColor: colors.sleepColor,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  titleOption: {
    fontSize: 18,
    color: colors.primaryTextColor
  }
})

export default Sleep
