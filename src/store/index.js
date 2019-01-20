import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers'
import sagas from '../sagas'

export default function InitializeStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        {},
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(sagas);

    return store
}