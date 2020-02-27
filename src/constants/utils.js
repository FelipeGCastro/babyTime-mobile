import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'
import v4 from 'uuid/v4'

const getData = async (type = false) => {
  try {
    const value = await AsyncStorage.getItem('@storage_Pins')
    if (value !== null) {
      const groupsOfDay = {}
      JSON.parse(value).map(item => {
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
        return new Moment(a).format('YYYYMMDD') - new Moment(b).format('YYYYMMDD')
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

export {
  getData
}
