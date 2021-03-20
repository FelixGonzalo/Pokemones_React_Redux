//constantes
const dataInicial = {
  array : []
}

const GET_POKEMONES = 'GET_POKEMONES'

// reducer
export default function pokeReducer(state = dataInicial, action){
  switch (action.type) {
    case GET_POKEMONES:
      return {...state, array: action.payload}
    default:
      return state
  }
}

// acciones
export const getPokemones = () => async (dispatch, getState) => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20', {
      method: 'GET'
    })
    const data = await res.json()
    dispatch({
      type: 'GET_POKEMONES',
      payload:  data.results
    })
  } catch (error) {
    console.log(error)
  }
}