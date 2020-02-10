import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  render () {
    // const { dateInput, disabled, dateTouchBody, dateIcon, placeholderText, dateText } = this.props
    const { placeholder, styleContainer, mode, data, dateInputStyle } = this.props
    return (
      <DatePicker
        style={styleContainer}
        date={data}
        mode={mode}
        placeholder={placeholder}
        format='DD-MM-YYY'
        minDate='2016-05-01'
        maxDate='2016-06-01'
        confirmBtnText='Confirm'
        showIcon={false}
        cancelBtnText='Cancel'
        customStyles={{
          dateIcon: null,
          dateInput: dateInputStyle
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { this.setState({ date: date }) }}
      />
    )
  }
}
