import { combineReducers } from 'redux'
import animeData from './animeReducer'
import searchData from './searchReducer'

export default combineReducers({
    animeData,
    searchData
})