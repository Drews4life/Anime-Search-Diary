import { fork, all } from 'redux-saga/effects';

import animeSagas from './animeSagas'

export default function* rootSaga() {
    yield all([
        fork(animeSagas)
    ])
}