import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import { colors } from 'src/constants'
import Breast from 'src/assets/breast.png'
import Bottle from 'src/assets/bottle.png'
import Bowl from 'src/assets/super-bowl.png'
import { Comments, Option, TimeInputs } from './items'
const options = [
  { id: 1, value: 'left', label: 'Esquerdo', icon: Breast },
  { id: 2, value: 'right', label: 'Direito', icon: Breast },
  { id: 3, value: 'formula', label: 'Fórmula', icon: Bottle },
  { id: 4, value: 'matern', label: 'Materno', icon: Bottle },
  { id: 5, value: 'papa', label: 'Papinha', icon: Bowl }
]
var i = 30
var mlOptions = []
while (i <= 200) {
  mlOptions.push(i)
  i = i + 5
}

const Feed = ({
  option, onHandleChange, comments, startTime,
  startDate,
  ml,
  endTime,
  endDate
}) => {
  const renderItem = item => {
    return (
      <Option key={item.id} onHandleChange={onHandleChange} itemColor={colors.feedColor} item={item} option={option} />
    )
  }

  const renderMlItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onHandleChange('ml')(item)}
        activeOpacity={0.7}
        style={[styles.buttonContainer,
          ml === item && { borderBottomColor: colors.feedColor, borderBottomWidth: 4 }]}
      >
        <View style={[styles.iconContainer, { borderColor: colors.feedColor }]}>
          <Text style={styles.numberText}>{item}</Text>
          <Text style={styles.mlText}>ml</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { justifyContent: option ? 'space-between' : 'flex-end' }]}>

      {option ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Option
              key={option.id}
              onHandleChange={onHandleChange}
              itemColor={colors.feedColor}
              item={option} option={option}
            />
          </View>
          <TimeInputs
            onHandleChange={onHandleChange}
            startTime={startTime}
            startDate={startDate}
            endTime={endTime}
            endDate={endDate}
          />
          <View style={{ marginBottom: 10 }}>
            <FlatList
              data={mlOptions}
              keyExtractor={item => item}
              horizontal
              renderItem={renderMlItem}
            />
          </View>
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
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7
  },
  iconContainer: {
    borderWidth: 3,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  numberText: {
    color: colors.primaryTextColor,
    fontSize: 18,
    lineHeight: 18
  },
  mlText: {
    color: colors.primaryTextColor,
    fontSize: 20,
    lineHeight: 18
  }
})

export default Feed
