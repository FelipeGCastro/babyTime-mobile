import React from 'react'
import {
  View, TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native'
import LeftClose from 'src/assets/leftClose.png'

import { colors, icons, polyglot } from 'src/constants'

export default function TimeLineItem ({ item, index, width, onItemPress }) {
  const renderText = (value, style) => (
    <Text style={[styles.rightTitle, index % 2 === 0 && styles.alignTextRight, style]}>{value}</Text>
  )
  return (
    <View style={[
      styles.pinTimeContainer,
      { width },
      index % 2 === 0 && { flexDirection: 'row-reverse' }
    ]}
    >
      <View style={styles.leftContainer} />
      <View style={styles.centerContainer}>
        <View
          style={[styles.arrowDown,
            { backgroundColor: colors[item.type] },
            index === 0 && styles.arrowDownRound]}
        >
          <Image source={LeftClose} resizeMode='contain' style={styles.downIcon} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onItemPress(item)}
        >
          <View style={[styles.timeIconContainer,
            { borderColor: colors[item.type] },
            item.type === 'day' && styles.pointStyle
          ]}
          >
            {item.type !== 'day' && <Image source={icons[item.option]} resizeMode='contain' style={styles.pinTimeIcon} />}

          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.rightContainer,
        index % 2 === 0 && { alignItems: 'flex-end' },
        item.type === 'day' && { paddingTop: 0 }
      ]}
      >
        <Text style={[styles.timeTitle, item.type === 'day' && { fontSize: 18 }]}>{item.startTime}</Text>
        {!!(item.endTime) && renderText(item.endTime)}
        {!!(item.type && item.type !== 'day') &&
          renderText(polyglot.t(item.type), { color: colors.primaryTextColor, fontSize: 16 })}
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
    justifyContent: 'center',
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
    width: 60,
    padding: 5,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    width: 30,
    padding: 5,
    height: 30,
    borderRadius: 15,
    borderWidth: 5,
    // backgroundColor: colors.primaryTextColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinTimeIcon: {
    width: 40
  },
  arrowDown: {
    flex: 1,
    marginBottom: -0.8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: 15,
    marginTop: -2
  },
  downIcon: {
    width: 15,
    height: 30,
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
    fontSize: 21,
    marginBottom: 3,
    color: colors.primaryTextColor
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 15
  },
  rightTitle: {
    fontSize: 14,
    marginBottom: 3,
    color: colors.secondaryTextColor
  },
  alignTextRight: {
    textAlign: 'right'
  }
})
