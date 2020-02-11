/* eslint-disable fp/no-nil, fp/no-let, fp/no-mutation, better/no-ifs */
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

let store = null

export default (reducer, initialState = {}) => {
  const enhancers = composeWithDevTools(applyMiddleware(thunkMiddleware))
  if (!store) {
    store = createStore(reducer, initialState, enhancers)
  }
  return store
}
