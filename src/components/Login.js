import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginWithGoogle} from '../redux/loginDucks'
import {withRouter} from 'react-router-dom'

const Login = (props) => {
  const dispatch = useDispatch()
  const loading = useSelector(store => store.login.loading)
  const activo = useSelector(store => store.login.activo)

  React.useEffect(() => {
    if (activo) {
      props.history.push('/inicio')
    }
  }, [activo, props.history])

  return (
    <div className="mt-5 text-center">
      <h3>Ingreso con Google</h3>
      <hr />
      <button 
        className="btn btn-dark"
        onClick={() => dispatch(loginWithGoogle())}
        disabled={loading}
      >
        Acceder
      </button>
    </div>
  )
}

export default withRouter(Login)
