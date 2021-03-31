import {auth, firebase} from '../firebase'

// data inicial
const dataInicial = {
  loading: false,
  activo: false
}

//types
const LOADING = 'LOADING'
const LOADING_ERROR = 'LOADING_ERROR'
const LOADING_EXITO = 'LOADING_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer

export default function loginReducer (state = dataInicial, action) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case LOADING_ERROR:
      return {...dataInicial}
    case LOADING_EXITO:
      return {...dataInicial, loading: false, user: action.payload, activo: true}
    case CERRAR_SESION:
      return{...dataInicial}
    default:
      return {...state}
  }
}

//action
export const loginWithGoogle = () => async (dispatch) => {
  dispatch({
    type: 'LOADING'
  })
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    const res = await auth.signInWithPopup(provider)
    console.log(res)
    dispatch({
      type: LOADING_EXITO,
      payload: {
        uid: res.user.uid,
        email: res.user.email
      }
    })
    localStorage.setItem('usuario', JSON.stringify({
      uid: res.user.uid,
      email: res.user.email
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: LOADING_ERROR
    })
  }
}
export const leerUsuarioActivo = () => (dispatch) => {
  if (localStorage.getItem('usuario')) {
    dispatch({
      type: LOADING_EXITO,
      payload: JSON.parse(localStorage.getItem('usuario'))
    })
  }
}

export const cerrarSesion = () => (dispatch) => {
  auth.signOut()
  localStorage.removeItem('usuario')
  dispatch({
    type: CERRAR_SESION
  })
}