import {
  CHANGE_OPTION,
  ADD_SEC
} from './types'

export const handleChange = (name, item) => {
  console.log(name, item, 'action')
  return ({
    type: CHANGE_OPTION,
    payload: { name, item }
  })
}

export const addSec = () => ({ type: ADD_SEC })
