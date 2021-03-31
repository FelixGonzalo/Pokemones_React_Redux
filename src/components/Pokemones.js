import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getPokemones, getNextPokemones, getPreviousPokemones,getDetallePokemon} from '../redux/pokeDucks'
import Detalle from './Detalle'

function Pokemones() {
  const dispatch = useDispatch()
  const pokemones = useSelector(store => store.pokemones.results)
  const next = useSelector(store => store.pokemones.next)
  const previous = useSelector(store => store.pokemones.previous)

  React.useEffect(() => {
    const fetchData = () => {
       dispatch(getPokemones(5))
    }
    fetchData()
  }, [dispatch])

  return (
    <div className="row">
      <h2>Pokemones</h2>
      <div className="col-md-6">
          <Detalle/>
      </div>
      <div className="col-md-6 mt-3">
        <ul className="list-group">
          {
            pokemones.map((item, index) => (
              <li key={index} className="list-group-item text-uppercase">
                {item.name}
                <button 
                  onClick={() => dispatch(getDetallePokemon(item.url))} 
                  className="btn btn-secondary btn-sm float-end"
                >Info</button>
              </li>
            ))
          }
        </ul>
        <div className="d-flex justify-content-between mt-2">
          {
            previous &&
            <button onClick={() => dispatch(getPreviousPokemones())} className="btn btn-danger">Anterior</button>
          }
          {
            next &&
            <button onClick={() => dispatch(getNextPokemones())} className="btn btn-danger">Siguiente</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Pokemones
