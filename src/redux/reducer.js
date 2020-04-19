import { CHANGE_OPTION, ADD_SEC } from './types'
import { Animated } from 'react-native'

const initialState = {
  verticalAnimation: new Animated.Value(100),
  horizontalAnimation: new Animated.Value(100),
  verticalActive: 100,
  horizontalActive: 100,
  pinsSelected: 'all',
  editing: false,
  pins: [],
  list: false,
  timer: false,
  second: 0
}

const main = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_OPTION:
      return { ...state, [action.payload.name]: action.payload.item }
    case ADD_SEC :
      return { ...state, second: state.second + 1 }
    default:
      return state
  }
}

export default main
