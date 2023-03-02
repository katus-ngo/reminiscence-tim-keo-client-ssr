import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'
import rootReducers from './reducers'


export default function configureStore (initialState = {}) {

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducers,
        initialState,
        applyMiddleware(sagaMiddleware)
    );

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga)
    };

    store.runSagaTask();
    return store;
}


