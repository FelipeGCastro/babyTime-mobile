import React from 'react'
import {
  View, TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native'
import LeftClose from 'src/assets/leftClose.png'

import { colors } from 'src/constants'

export default function TimeLineItem ({ item, index, width, onItemPress }) {
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
            { backgroundColor: item.color },
            index === 0 && styles.arrowDownRound]}
        >
          <Image source={LeftClose} resizeMode='contain' style={styles.downIcon} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <View style={[styles.timeIconContainer, { borderColor: item.color }]}>

            <Image source={item.icon} resizeMode='contain' style={styles.pinTimeIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.rightContainer, index % 2 === 0 && { alignItems: 'flex-end' }]}>
        <Text style={styles.timeTitle}>{item.time.start}</Text>
        <Text style={[styles.rightTitle, index % 2 === 0 && styles.alignTextRight]}>{item.time.duration}</Text>
        <Text style={[styles.rightTitle, index % 2 === 0 && styles.alignTextRight]}>{item.title}</Text>
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
  pinTimeIcon: {
    width: 40
  },
  arrowDown: {
    flex: 1,
    marginBottom: -0.8,
    minHeight: 70,
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
    fontSize: 20,
    marginBottom: 3,
    color: colors.primaryTextColor
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20
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
