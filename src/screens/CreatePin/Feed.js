import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import { colors } from 'src/constants'
import { Comments, Option, TimeInputs, OneOption } from './items'
const options = [
  'left',
  'right',
  'formula',
  'matern',
  'papa'
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
      <Option key={item} onHandleChange={onHandleChange} itemColor={colors.feedColor} item={item} option={option} />
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
          <Text style={styles.numberText}>{item.toString()}</Text>
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
            <OneOption
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
          {(option !== 'left' && option !== 'right') && (
            <View style={{ marginBottom: 10 }}>
              <FlatList
                data={mlOptions}
                keyExtractor={item => item.toString()}
                horizontal
                renderItem={renderMlItem}
              />
            </View>
          )}

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
    fontSize: 16,
    lineHeight: 18
  },
  mlText: {
    color: colors.primaryTextColor,
    fontSize: 18,
    lineHeight: 18
  }
})

export default Feed
