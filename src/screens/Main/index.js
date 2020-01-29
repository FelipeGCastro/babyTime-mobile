import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text, Dimensions } from 'react-native'
import { colors } from '../../constants'
import Diaper from '../../assets/diaper.png'
import ButtonsActions from '../../components/ButtonsActions'
import Pin from '../../assets/pin.png'
import timeLine from '../../temp/timeLine'
export default class Main extends Component {
  
  state = {
    height: Dimensions.get('window').height
  }
  handler = ({ window }) => this.setState({ height: window.height })
  componentDidMount = () => {
    Dimensions.addEventListener('change', this.handler)
  }
  componentWillUnmount = () => {
    Dimensions.addEventListener('change', this.handler)
  }

  renderTimeLine = ({ item }) => (
    <View style={styles.pinTimeContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.leftTitle}>{item.time.start}</Text>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.timeIconContainer}>
          <Image source={Diaper} resizeMode='contain' style={styles.pinTimeIcon} />
        </TouchableOpacity>
        <View style={styles.arrowDown} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.rightTitle}>{item.title}</Text>
      </View>
    </View>
  )

  render () {
    return <View style={styles.container}>
    <View style={styles.mainContainer}>
      <FlatList
      data={timeLine}
      inverted
      keyExtractor={item => item.id.toString()}
      renderItem={this.renderTimeLine}
      ListHeaderComponentStyle={{ marginTop: 120 }}
      ListHeaderComponent={()=> <View style={{ height: 200 }}/>}
      />
       <ButtonsActions />
    </View>
    {/* <View style={[styles.pinPageContainer, { height: this.state.height }]}>
      <Image source={Pin} resizeMode='contain' style={styles.buttonsIcon} />
    </View> */}
    </View>
  }
}

const styles = StyleSheet.create({
  // PIN PAGE CONTAINER
  pinPageContainer: {
    paddingTop: 40,
    paddingBottom: 30,
  },




  // TERMINA AQUI
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: -5
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: colors.diaperColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinTimeIcon: {
    width: 40
  },
  arrowDown: {
    height: 70,
    width: 15,
    marginTop: -2,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.diaperColor
  },
  leftContainer: {
    padding: 10,
  },
  leftTitle: {
    fontSize: 18,
    color: colors.primaryTextColor
  },
  rightContainer: {
    padding: 10,
  },
  rightTitle: {
    fontSize: 18,
    color: colors.primaryTextColor
  }
})
