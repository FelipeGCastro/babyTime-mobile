import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { MyDatePicker } from 'src/components'
import { colors, polyglot, icons } from 'src/constants'

const Option = ({ onHandleChange, item, option, itemColor }) => {
  return (
    <TouchableOpacity
      onPress={() => onHandleChange('option')(option ? '' : item)}
      activeOpacity={0.7}
      style={[styles.buttonContainer, option === item && { borderBottomColor: itemColor, borderBottomWidth: 3 }]}
    >
      <View style={[styles.iconContainer, { borderColor: itemColor }]}>
        <Image source={icons[item]} resizeMode='contain' style={styles.optionIcon} />
      </View>
      <Text style={styles.titleOption}>{polyglot.t(item)}</Text>
    </TouchableOpacity>
  )
}
const OneOption = ({ onHandleChange, item, option, itemColor }) => {
  return (
    <TouchableOpacity
      onPress={() => onHandleChange('option')(option ? '' : item)}
      activeOpacity={0.7}
      style={[styles.buttonContainer, option === item && { borderBottomColor: itemColor, borderBottomWidth: 3 }]}
    >
      <Text style={styles.titleOption}>{polyglot.t(item)}</Text>
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

const TimeInputs = ({ type, onHandleChange, startTime, startDate, endTime, endDate, timer }) => {
  const date = (data, mode, placeholder, onDateChange, format, minDate) => (
    <MyDatePicker
      data={data}
      mode={mode}
      placeholder={placeholder}
      dateInputStyle={[styles.dateInputStyle, { borderColor: colors[type] }]}
      styleContainer={{ width: 130 }}
      format={format}
      minDate={minDate}
      onDateChange={onDateChange}
    />
  )
  const dateFormat = 'DD/MM/YYYY'
  return !timer && (
    <View
      style={styles.dateContainer}
    >

      <View style={styles.timerContainer}>
        <Text style={styles.titleTime}>{polyglot.t('begining')}:</Text>
        {date(startTime, 'time', polyglot.t('hour'), onHandleChange('startTime'), 'HH:mm', undefined)}
        {date(startDate, 'date', polyglot.t('date'), onHandleChange('startDate'), dateFormat, undefined)}

      </View>
      {endTime !== 'none' && (
        <View style={styles.timerContainer}>
          <Text style={styles.titleTime}>{polyglot.t('end')}:</Text>
          {date(endTime, 'time', polyglot.t('hour'), onHandleChange('endTime'), 'HH:mm', startTime)}
          {date(endDate, 'date', polyglot.t('date'), onHandleChange('endDate'), dateFormat, startDate)}
        </View>)}
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20
  },
  titleComments: {
    fontSize: 18,
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
    alignSelf: 'center',
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
    fontSize: 16,
    color: colors.primaryTextColor
  },
  dateInputStyle: {
    marginLeft: 15,
    height: 44,
    borderRadius: 10,
    borderColor: colors.primaryTextColor,
    borderWidth: 1
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  titleTime: {
    fontSize: 18,
    color: colors.primaryTextColor,
    alignSelf: 'center'
  }
})

export {
  Comments,
  Option,
  OneOption,
  TimeInputs
}
