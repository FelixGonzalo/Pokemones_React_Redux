import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import pokeReducer from './pokeDucks'
import loginReducer, {leerUsuarioActivo} from './loginDucks'

const rootReducer = combineReducers({
  pokemones: pokeReducer,
  login: loginReducer
})

//configuracion de herramienta redux en navegador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  leerUsuarioActivo()(store.dispatch)
  return store
}