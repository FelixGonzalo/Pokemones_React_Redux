import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getPokemones} from '../redux/pokeDucks'

function Pokemones() {
  const dispatch = useDispatch()
  const pokemones = useSelector(store => store.pokemones.array)

  React.useEffect(()=>{
    dispatch(getPokemones())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <ul>
        {
          pokemones.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Pokemones
