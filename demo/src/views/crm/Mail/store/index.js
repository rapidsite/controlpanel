import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import state2 from './BLSlice'
import data from './dataSlice'

const reducer = combineReducers({
    state,
    state2,
    data,
})

export default reducer
