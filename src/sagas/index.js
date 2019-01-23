import { fork, all } from 'redux-saga/effects';

import animeSagas from './animeSagas'
import watchListSagas from './watchListSagas'

export default function* rootSaga() {
    yield all([
        fork(animeSagas),
        fork(watchListSagas)
    ])
}