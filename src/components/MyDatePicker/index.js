import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from 'src/constants'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  render () {
    // const { dateInput, disabled, dateTouchBody, dateIcon, placeholderText, dateText } = this.props
    const {
      placeholder,
      styleContainer,
      minDate,
      maxDate,
      format,
      mode,
      data,
      dateInputStyle,
      onDateChange
    } = this.props
    return (
      <DatePicker
        style={styleContainer}
        date={data}
        mode={mode}
        placeholder={placeholder}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText='Confirm'
        showIcon={false}
        cancelBtnText='Cancel'
        customStyles={{
          dateIcon: null,
          dateInput: dateInputStyle,
          dateText: styles.dateText,
          placeholderText: styles.placeholderText
          // ... You can check the source to find the other keys.
        }}
        onDateChange={onDateChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: 16,
    color: colors.primaryTextColor
  },
  placeholderText: {
    fontSize: 16
  }
})
