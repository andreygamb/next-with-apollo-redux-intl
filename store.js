import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

export default (initialState = {}) => {
  return createStore(() => ({}), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
