import { AsyncStorage } from 'react-native'
import { call, put, takeEvery, select} from 'redux-saga/effects';
import { 
    ADD_EPISODES_SEEN, 
    GET_FAVORITE, 
    SUBTRACT_EPISODES_SEEN,
    FINISH_EP,
    UNFINISH_EP 
} from '../types';

function* changeSeenEpsSaga(action) {
    const state = yield select();
    const currentFavorites = state.animeData.favorites;
    const addEpisodes = action.type === ADD_EPISODES_SEEN;

    let changeSeen = {}

    if(action.payload.type === 'Manga') {
        changeSeen = {pagesRead:  addEpisodes ? currentFavorites[action.payload.id].pagesRead + 1 : currentFavorites[action.payload.id].pagesRead  - 1}
        changeSeen = changeSeen.pagesRead >= 0 ? changeSeen : {pagesRead: 0}
    } else {
        changeSeen = {episodesSeen: addEpisodes ? currentFavorites[action.payload.id].episodesSeen + 1 : currentFavorites[action.payload.id].episodesSeen - 1} 
        changeSeen = changeSeen.episodesSeen >= 0 ? changeSeen : {episodesSeen: 0}
    }
   
    
    const newFavorites = {
        ...currentFavorites,
        [action.payload.id]: {
            ...currentFavorites[action.payload.id],
            ...changeSeen
        }
    }

    try {
        yield AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
        yield put({type: GET_FAVORITE, payload: newFavorites})
    } catch(e) {
        console.log('could not append data: ', e)
    }
}

function* changeStatusEp(action) {
    const state = yield select();
    const currentFavorites = state.animeData.favorites;
    const toToggleFav = currentFavorites[action.payload]

    const isFinished = action.type === FINISH_EP

    const newFavorites = {
        ...currentFavorites,
        [action.payload]: {
            ...toToggleFav,
            finished: isFinished
        }
    }

    try {
        yield AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
        yield put({type: GET_FAVORITE, payload: newFavorites})
    } catch(e) {
        console.log('could not append data: ', e)
    }
}

export default function* watcherSaga() {
    yield takeEvery([ADD_EPISODES_SEEN, SUBTRACT_EPISODES_SEEN], changeSeenEpsSaga)
    yield takeEvery([FINISH_EP, UNFINISH_EP], changeStatusEp)
}

