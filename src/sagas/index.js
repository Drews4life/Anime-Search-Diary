import { fork, all } from 'redux-saga/effects';

import animeSagas from './animeSagas'
import watchListSagas from './watchListSagas'
import searchSaga from './searchSagas';

export default function* rootSaga() {
    yield all([
        fork(animeSagas),
        fork(watchListSagas),
        fork(searchSaga)
    ])
}