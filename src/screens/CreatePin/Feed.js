import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from 'src/constants'
import Breast from 'src/assets/breast.png'
import Bottle from 'src/assets/bottle.png'
import Bowl from 'src/assets/super-bowl.png'
import { Comments, Option } from './items'
const options = [
  { id: 1, value: 'left', label: 'Esquerdo', icon: Breast },
  { id: 2, value: 'right', label: 'Direito', icon: Breast },
  { id: 3, value: 'formula', label: 'Fórmula', icon: Bottle },
  { id: 4, value: 'matern', label: 'Materno', icon: Bottle },
  { id: 5, value: 'papa', label: 'Papinha', icon: Bowl }
]

const Feed = ({ option, onHandleChange, comments }) => {
  const renderItem = item => {
    return (
      <Option key={item.id} onHandleChange={onHandleChange} itemColor={colors.feedColor} item={item} option={option} />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})

export default Feed
