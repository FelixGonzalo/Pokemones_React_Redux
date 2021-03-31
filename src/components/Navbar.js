import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {cerrarSesion} from '../redux/loginDucks'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {
  const dispatch = useDispatch()
  const activo = useSelector(store => store.login.activo)
  
  const cerrarLaSesion = () => {
    dispatch(cerrarSesion())
    props.history.push('/login')
  }

  return (
    <div className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand m-2" to="/">APP POKE</Link>
      <div className="d-flex">
        {
          activo ? (
            <>
              <NavLink className="btn btn-dark mr-2" to="/inicio" exact>Inicio</NavLink>
              <button className="btn btn-dark mr-2" onClick={() => cerrarLaSesion()}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <NavLink className="btn btn-dark mr-2" to="/login" exact>Login</NavLink>
          )
        }
      </div>
    </div>
  )
}

export default withRouter(Navbar)
