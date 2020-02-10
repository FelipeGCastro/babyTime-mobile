import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { MyDatePicker } from 'src/components'
import { colors } from 'src/constants'

const Option = ({ onHandleChange, item, option, itemColor }) => {
  return (
    <TouchableOpacity
      onPress={() => onHandleChange('option')(item.value)}
      activeOpacity={0.7}
      key={item.id}
      style={[styles.buttonContainer, option === item.value && { borderBottomColor: itemColor, borderBottomWidth: 3 }]}
    >
      <View style={[styles.iconContainer, { borderColor: itemColor }]}>
        <Image source={item.icon} resizeMode='contain' style={styles.optionIcon} />
      </View>
      <Text style={styles.titleOption}>{item.label}</Text>
    </TouchableOpacity>
  )
}

const Comments = ({ comments, onHandleChange }) => {
  return (
    <View
      style={styles.commentContainer}
    >
      <Text style={styles.titleComments}>Algum comentário?
      </Text>
      <TextInput
        value={comments}
        onChangeText={onHandleChange('comments')}
        placeholderTextColor={colors.placeholderColor}
        style={styles.input}
        placeholder='Escreva aqui o seu comentário'
      />
    </View>
  )
}

const TimeInputs = ({ comments, onHandleChange, startTime, startDate }) => {
  return (
    <View
      style={styles.commentContainer}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.titleComments}>Início:</Text>
        <MyDatePicker
          data={startTime}
          mode='time'
          placeholder='Data Início'
          dateInputStyle={styles.dateInputStyle}
          styleContainer={{ width: 120 }}
        />
        <MyDatePicker
          data={startDate}
          mode='date'
          placeholder='Data Início'
          dateInputStyle={styles.dateInputStyle}
          styleContainer={{ width: 120 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20
  },
  titleComments: {
    fontSize: 16,
    color: colors.primaryTextColor,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center'
  },
  input: {
    borderBottomColor: colors.primaryTextColor,
    borderBottomWidth: 1,
    padding: 10,
    color: colors.primaryTextColor,
    fontSize: 16
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
    paddingVertical: 10
  },
  optionIcon: {
    width: 35
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
  titleOption: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  dateInputStyle: {
    marginLeft: 15,
    borderRadius: 4,
    borderWidth: 2
  }
})

export {
  Comments,
  Option,
  TimeInputs
}
