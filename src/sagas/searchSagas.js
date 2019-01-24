import {mapKeys, omit} from 'lodash'
import { AsyncStorage } from 'react-native'
import { call, put, takeEvery, select} from 'redux-saga/effects';
import { 
    SEARCH_ANIME_BY_TYPE, 
    BAD_REQUEST,
    SAVE_SEARCHED_ANIME, 
    START_SEARCH_BY_TYPE_LODAING
} from '../types'
import axios from 'axios';

const baseURL = 'https://api.jikan.moe/v3'
const api = query => axios.get(`${baseURL}/${query}`)

function* searchBySaga(action) {
    const { query, type } = action.payload;

    try {
        yield put({type: START_SEARCH_BY_TYPE_LODAING})
        const { data } = yield call(api, query);
        
        yield put({type: SAVE_SEARCHED_ANIME, payload: data[type]})
        
    } catch(e) {
        console.log('url request: ', `${baseURL}/${query}`)
        console.log('request failed : ', e)
        yield put({type: BAD_REQUEST})
    }
}

export default function* watcherSaga() {
    yield takeEvery(SEARCH_ANIME_BY_TYPE, searchBySaga)
}