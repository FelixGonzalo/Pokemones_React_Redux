//constantes
const dataInicial = {
  count: 0,
  next: null,
  previous:null,
  results: []
}

const GET_POKEMONES = 'GET_POKEMONES'
const GET_NEXT_POKEMONES = 'GET_NEXT_POKEMONES'
const GET_PREVIOUS_POKEMONES = 'GET_PREVIOUS_POKEMONES'
const GET_DETALLE_POKEMON = 'GET_DETALLE_POKEMON'

// reducer
export default function pokeReducer(state = dataInicial, action){
  switch (action.type) {
    case GET_POKEMONES:
      return {...state, ...action.payload}
    case GET_NEXT_POKEMONES:
      return {...state, ...action.payload}
    case GET_PREVIOUS_POKEMONES:
      return {...state, ...action.payload}
    case GET_DETALLE_POKEMON:
      return {...state, detallePokemon: action.payload}
    default:
      return state
  }
}

// acciones
export const getPokemones = (cantidad) => async (dispatch) => {
  if(sessionStorage.getItem('offset=0')){
    dispatch({
      type: 'GET_POKEMONES',
      payload:  JSON.parse(sessionStorage.getItem('offset=0'))
    })
    return
  } // datos desde sessionStorage

  try {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${cantidad}`)
  const data = await res.json()
  dispatch({
    type: 'GET_POKEMONES',
    payload:  data
  })
  sessionStorage.setItem('offset=0', JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const getNextPokemones = () => async (dispatch, getState) => {
  const {next} = getState().pokemones

  if(sessionStorage.getItem(next)){
    dispatch({
      type: 'GET_NEXT_POKEMONES',
      payload:  JSON.parse(sessionStorage.getItem(next))
    })
    return
  } // datos desde sessionStorage

  try {
    const res = await fetch(next)
    const data = await res.json()
    dispatch({
      type: 'GET_NEXT_POKEMONES',
      payload: data
    })
    sessionStorage.setItem(next, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const getPreviousPokemones = () => async (dispatch, getState) => {
  const {previous} = getState().pokemones
  if(sessionStorage.getItem(previous)){
    dispatch({
      type: 'GET_PREVIOUS_POKEMONES',
      payload:  JSON.parse(sessionStorage.getItem(previous))
    })
    return
  } // datos desde sessionStorage

  try {
    const res = await fetch(previous)
    const data = await res.json()
    dispatch({
      type: 'GET_PREVIOUS_POKEMONES',
      payload: data
    })
    sessionStorage.setItem(previous, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const getDetallePokemon = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) => {
  
  if(sessionStorage.getItem(url)){
    dispatch({
      type: GET_DETALLE_POKEMON,
      payload: JSON.parse(sessionStorage.getItem(url))
    })
    return
  }

  try {
    const res = await fetch(url)
    const data = await res.json()
    dispatch({
      type: GET_DETALLE_POKEMON,
      payload: {
        nombre: data.name,
        ancho: data.weight,
        alto: data.height,
        foto: data.sprites.front_default
      }
    })
    sessionStorage.setItem(url, JSON.stringify({
      nombre: data.name,
      ancho: data.weight,
      alto: data.height,
      foto: data.sprites.front_default
    }))
  } catch (error) {
    console.log(error)
  }
}