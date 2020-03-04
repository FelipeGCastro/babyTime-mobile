import React from 'react'
import {
  View, TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native'
import moment from 'moment'
import LeftClose from 'src/assets/leftClose.png'

import { colors, icons, polyglot } from 'src/constants'

export default function TimeLineShortItem ({ item, index, width, onItemPress }) {
  const renderText = (value, style) => (
    <Text
      style={[styles.rightTitle, style]}
    >{value},{' '}
    </Text>
  )
  const isDay = item.type === 'day'
  const duration = moment('1900-01-01 00:00:00')
    .add(item.duration, 'seconds').format(item.duration < 60 ? 'ss [Segundos]' : (item.duration > 3599) ? 'h [Hrs], m [Min]' : 'm [Minutos]')
  return (
    <View style={[
      styles.pinTimeContainer,
      { width }
    ]}
    >
      <View style={[styles.centerContainer, isDay && { marginLeft: 2 }]}>
        <View
          style={[styles.arrowDown,
            { backgroundColor: colors[item.type] },
            index === 0 && styles.arrowDownRound]}
        >
          <Image source={LeftClose} resizeMode='contain' style={styles.downIcon} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => !isDay && onItemPress(item)}
        >
          <View style={[styles.timeIconContainer,
            { borderColor: colors[item.type] },
            isDay && styles.pointStyle
          ]}
          >
            {!isDay && <Image source={icons[item.option]} resizeMode='contain' style={styles.pinTimeIcon} />}

          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.timeTitle}>{item.startTime}, </Text>
        {!!(item.duration) && renderText(duration)}
        {!!(item.endTime) && renderText(item.endTime)}
        {!!(item.type && !isDay) &&
          renderText(polyglot.t(item.type))}
        {!!(item.option &&
          item.option !== 'note' &&
          item.option !== 'bath') && renderText(polyglot.t(item.option))}
        {!!(item.note) && renderText(`Nota: ${item.note}`)}
        {!!(item.ml) && renderText(`${item.ml} ml`)}
        {!!(item.comments) && renderText(item.comments)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pinTimeContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  timeIconContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    width: 45,
    padding: 5,
    height: 45,
    borderRadius: 23,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointStyle: {
    width: 30,
    marginLeft: 5,
    marginHorizontal: 5,
    height: 30,
    borderRadius: 15
  },
  pinTimeIcon: {
    width: 25,
    maxHeight: 30
  },
  arrowDown: {
    flex: 1,
    marginBottom: -0.8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    marginTop: -2
  },
  downIcon: {
    width: 10,
    height: 15,
    transform: [
      { rotateZ: '-90deg' }
    ]
  },
  arrowDownRound: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  centerContainer: {
    flexShrink: 1,
    height: 'auto',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    padding: 10
  },
  timeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primaryTextColor
  },
  rightContainer: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 5,
    paddingTop: 8,
    flexDirection: 'row'
  },
  rightTitle: {
    fontSize: 14,
    color: colors.secondaryTextColor
  },
  alignTextRight: {
    textAlign: 'right'
  }
})
