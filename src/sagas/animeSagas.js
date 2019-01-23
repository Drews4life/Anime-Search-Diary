import { AsyncStorage } from 'react-native'
import { call, put, takeEvery, select} from 'redux-saga/effects';
import { 
    FETCH_TOP_ANIME, 
    GET_TOP_ANIME, 
    LOADING_ANIMES, 
    STOP_LOADING_ANIMES, 
    FETCH_FAVORITE,
    GET_FAVORITE,
    SAVE_TO_FAVORITE,
    SAVE_TO_STORAGE,
    DELETE_FROM_FAVORITES,
    DELETE_FROM_STORAGE,
    FETCH_ADDITIONAL_PAGE,
    GET_ADDITIONAL_PAGE
} from '../types';
import axios from 'axios';
import {mapKeys, omit} from 'lodash'

const baseURL = 'https://api.jikan.moe/v3';
const api = (params) => axios.get(`${baseURL}/${params}`)

function* fetchTopAnimeSaga (action) {
    try {
        yield put({type: LOADING_ANIMES})
        console.log('selected params: ', action)
        const { data } = yield call(api, `top/${action.payload}/1`)
        yield put({type: GET_TOP_ANIME, payload: data.top})
    } catch(e) {
        console.log('fetch failed: ', e)
    }
}

function* fetchAdditionalPageSaga(action) {
    try {
        const { data } = yield call(api, `top/${action.payload.param}/${action.payload.page}`)
        console.log('additional pages output: ', data)
        yield put({type: GET_ADDITIONAL_PAGE, payload: data.top})
    } catch(e) {
        console.log('fetch additional page failed: ', e)
    }
}

function* fetchFavoriteSaga() {
    try {
        
        let favs = yield AsyncStorage.getItem('favorites')
        console.log('favs: ', favs)
        let result = {};
        if(favs !== null) {
            favs = JSON.parse(favs)
            result = mapKeys(favs, 'id')
        }
        yield put({type: GET_FAVORITE, payload: result })
    } catch(e) {
        console.log('cant get favorites: ', e)
    }
}

function* saveToFavoriteSaga(action) {
    const {
        mal_id,
        title,
        url,
        episodes,
        type,
        pages
    } = action.payload;

    const newFav = {
        id: mal_id,
        type,
        title,
        url,
        finished: false
    }

    let newFavorite = {}
    
    if(newFav.type === 'Manga') {
        newFavorite = {...newFav, pagesRead: 0, pages}
    } else {
        newFavorite = {...newFav, episodes, episodesSeen: 0}
    }

    const state = yield select();
    const saveStorage = {...state.animeData.favorites, newFavorite}
    console.log('state ---: ', state.animeData.favorites)
    try {
        yield AsyncStorage.setItem('favorites', JSON.stringify(saveStorage))
        yield put({type: SAVE_TO_STORAGE, payload: newFavorite})
    } catch(e) {
        console.log('cannot save to storage: ', e)
    }
    
}

function* deleteFromFavoriteSaga(action) {
    const state = yield select()
    const newFavorites = omit(state.animeData.favorites, action.payload)
    try {
        yield AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
        yield put({type: DELETE_FROM_STORAGE, payload: newFavorites})
    } catch(e) {
        console.log('couldnt delete favorite: ', e)
    }
}

export default function* watcherSaga() {
    yield takeEvery(FETCH_TOP_ANIME, fetchTopAnimeSaga)
    yield takeEvery(FETCH_FAVORITE, fetchFavoriteSaga)
    yield takeEvery(SAVE_TO_FAVORITE, saveToFavoriteSaga)
    yield takeEvery(DELETE_FROM_FAVORITES, deleteFromFavoriteSaga)
    yield takeEvery(FETCH_ADDITIONAL_PAGE, fetchAdditionalPageSaga)
}