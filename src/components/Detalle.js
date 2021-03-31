
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDetallePokemon} from '../redux/pokeDucks'

function Detalle() {

  const dispatch = useDispatch()
  const pokemon = useSelector(store => store.pokemones.detallePokemon)

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(getDetallePokemon())
    }
    fetchData()
  }, [dispatch])

  return pokemon ? (
    <div className="text-center">
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <img src={pokemon.foto} alt="pokemon" className="img-fluid"></img>
          <div className="card-title">{pokemon.nombre}</div>
          <p className="card-text">Alto: {pokemon.alto}| Ancho: {pokemon.ancho}</p>
        </div>
      </div>
    </div>
  ) : null
}

export default Detalle