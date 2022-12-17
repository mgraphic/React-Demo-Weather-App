import { configureStore } from '@reduxjs/toolkit';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
    reducer: rootReducer,
    // middleware: [thunk, reduxImmutableStateInvariant],
    // enhancers: composeEnhancers(
    //     applyMiddleware(thunk, reduxImmutableStateInvariant)
    // ),
});
