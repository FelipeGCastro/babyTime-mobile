import React, { Component } from 'react'

import { View, FlatList, TouchableOpacity, StyleSheet, Text, LayoutAnimation, Alert } from 'react-native'
import { colors, polyglot } from 'src/constants'
import Moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Options } from 'src/components'

// import { Container } from './styles';
const menuList = [
  'feed',
  'sleep',
  'diaper',
  'note',
  'bath'
]
export default class SideScreen extends Component {
  state = {
    selected: false,
    type: false
  }

  componentDidMount = async () => {
    if (this.props.editing) {
      await this.handleSetEditing()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.editing && (prevProps.editing.id !== this.props.editing.id)) {
      this.handleSetEditing()
    }
    if (prevProps.horizontalActive !== this.props.horizontalActive &&
      this.props.horizontalActive === 100
    ) {
      this.resetState()
    }
  }

  resetState = () => {
    setTimeout(() => {
      this.setState({ type: false, selected: false })
    }, 800)
  }

  handleSetEditing = () => {
    const { editing } = this.props
    this.setState({ ...editing })
  }

  renderMenuItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={this.handleSelectItem(item)}
        style={[styles.optionContainer, { borderColor: colors[item] }]}
      >
        <Text style={styles.textOption}>{polyglot.t(item)}</Text>
      </TouchableOpacity>
    )
  }

  handleSelectItem = value => () => {
    const { onItemPress } = this.props
    onItemPress(value)
  }

  handleChange = name => value => {
    this.setState({ [name]: value })
    if (name === 'option') { LayoutAnimation.easeInEaseOut() }
  }

  handleDeletePin = () => {
    this.props.onRemovePin(this.state.id)
    this.handleJustClose()
  }

  handleDeleteAlert = () => {
    Alert.alert(
      polyglot.t('deletePinAlertTitle'),
      polyglot.t('deletePinAlertMsg'),
      [
        { text: polyglot.t('cancel'), style: 'cancel' },
        {
          text: polyglot.t('confirmDelete'),
          style: 'destructive',
          onPress: this.handleDeletePin
        }
      ]
    )
  }

  handleCloseBottom = () => {
    const { id, type, comments, option, duration, note, startTime, startDate, endTime, endDate, ml } = this.state
    const { onEditingChange, editing } = this.props
    var inSec = false
    if (endTime && endDate) {
      const now = Moment(`${startDate + ' ' + startTime}`, 'DD/MM/YYYY HH:mm')
      const then = Moment(`${endDate + ' ' + endTime}`, 'DD/MM/YYYY HH:mm')
      var durationDiff = Moment.duration(then.diff(now))
      inSec = durationDiff.asSeconds()
    }

    const finalDuration = inSec || duration
    const pinsObj = {
      id,
      type,
      comments,
      option,
      duration: finalDuration,
      startTime,
      startDate,
      note,
      endDate: endDate || null,
      endTime: endTime || null,
      ml
    }
    if (this.verifyPin(pinsObj, editing)) {
      this.handleJustClose()
      return
    }
    onEditingChange(pinsObj)
    this.handleJustClose()
  }

  verifyPin = (pinsObj, editing) => {
    return pinsObj.option === editing.option &&
    pinsObj.comments === editing.comments &&
    pinsObj.duration === editing.duration &&
    pinsObj.startTime === editing.startTime &&
    pinsObj.startDate === editing.startDate &&
    pinsObj.note === editing.note &&
    pinsObj.endDate === editing.endDate &&
    pinsObj.endTime === editing.endTime &&
    pinsObj.ml === editing.ml
  }

  handleJustClose = () => {
    const { onAnimatedPress } = this.props
    onAnimatedPress('horizontal', 'close')
    setTimeout(() => {
      this.setState({ type: false })
    }, 800)
  }

  renderClose = () => (

    <TouchableOpacity
      onPress={this.handleJustClose}
      style={styles.cancel}
    >
      <Text style={styles.buttonText}>X</Text>
    </TouchableOpacity>
  )

  handleChangeEditing = name => value => {
    this.setState({ [name]: value })
  }

  renderOptions = (item) => {
    const { comments, option, note, startTime, startDate, endTime, endDate, ml } = this.state
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerScroll}
        keyboardShouldPersistTaps='handled'
        extraScrollHeight={40}
      >
        <View style={styles.titleContainer}>
          <View style={{ width: 60 }} />
          <Text style={styles.editingTitle}>{polyglot.t('editing')}</Text>
          <TouchableOpacity
            onPress={this.handleDeleteAlert}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 16, color: colors.feedColor }}>Excluir</Text>
          </TouchableOpacity>
        </View>
        <Options
          item={item}
          option={option}
          onHandleChange={this.handleChange}
          ml={ml}
          comments={comments}
          startTime={startTime}
          startDate={startDate}
          endTime={endTime}
          note={note}
          endDate={endDate}
        />
        {this.renderClose()}
        <TouchableOpacity
          onPress={this.handleCloseBottom}
          style={styles.close}
        >
          <Text style={styles.buttonText}>{polyglot.t('save')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>)
  }

  render () {
    const { type } = this.state
    return (
      <View style={styles.container}>
        {type ? this.renderOptions(type)
          : (
            <View style={{ justifyContent: 'center' }}>
              <FlatList
                data={menuList}
                keyExtractor={item => item}
                renderItem={this.renderMenuItem}
              />
            </View>
          )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingVertical: 30,
    paddingTop: 50
  },
  optionContainer: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginHorizontal: 20,
    paddingHorizontal: 20
  },
  deleteButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    // marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  textOption: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  close: {
    width: 160,
    height: 50,
    backgroundColor: colors.activeColor,
    marginBottom: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  editingTitle: {
    fontSize: 22,
    color: colors.primaryTextColor,
    textAlign: 'center'
  },
  cancel: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: colors.feedColor,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 48
  }
})
