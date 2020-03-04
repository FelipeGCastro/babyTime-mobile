import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'
import v4 from 'uuid/v4'

const getData = async (type = false) => {
  try {
    const value = await AsyncStorage.getItem('@storage_Pins')
    if (value !== null) {
      const groupsOfDay = {}
      const sortedValue = JSON.parse(value).sort((a, b) => {
        const aTime = Moment(a.startTime, 'HH:mm')
        const bTime = Moment(b.startTime, 'HH:mm')
        const aDate = Moment(a.startDate, 'DD/MM/YYYY').format('YYYYMMDD')
        const bDate = Moment(b.startDate, 'DD/MM/YYYY').format('YYYYMMDD')
        return aDate - bDate || aTime - bTime
      })
      console.log('getData')
      sortedValue.map(item => {
        const checkType = !type || type === 'all' ? true : type === item.type
        const startDate = item.startDate
        const dayObj = { id: v4(), startTime: startDate, type: 'day' }
        if (groupsOfDay[startDate] && checkType) {
          groupsOfDay[startDate].push(item)
        } else if (checkType) {
          groupsOfDay[startDate] = [dayObj, item]
        }
      })
      const sortedGroup = Object.keys(groupsOfDay).sort((a, b) => {
        return Moment(a, 'DD/MM/YYYY').format('YYYYMMDD') - Moment(b, 'DD/MM/YYYY').format('YYYYMMDD')
      })
      let groupArray = []
      sortedGroup.map(key => {
        groupArray = [...groupArray, ...groupsOfDay[key]]
      })
      console.tron.log(groupArray.reverse())
      return groupArray
    }
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

const changePins = async (item) => {
  try {
    const pins = await AsyncStorage.getItem('@storage_Pins')
    if (pins !== null) {
      const editedPins = JSON.parse(pins).map(i => {
        if (i.id === item.id) {
          i = item
          return i
        }
        return i
      })
      await AsyncStorage.setItem('@storage_Pins', JSON.stringify(editedPins))
    }
    return true
  } catch (error) {
    console.tron.log(error)
    return false
  }
}

const removePin = async (id) => {
  try {
    const pins = await AsyncStorage.getItem('@storage_Pins')
    if (pins !== null) {
      const editedPins = JSON.parse(pins).filter(i => {
        return i.id !== id
      })
      await AsyncStorage.setItem('@storage_Pins', JSON.stringify(editedPins))
    }
    return true
  } catch (error) {
    console.tron.log(error)
    return false
  }
}

export {
  getData,
  changePins,
  removePin
}
