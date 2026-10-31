import { useState } from 'react'
import SearchByUser from './SearchByUser'
import SearchByRestaurant from './SearchByRestaurant'
import SearchByDish from './SearchByDish'

function Search() {
  const [searchBy, setSearchBy] = useState('Dish')

  return (
    <div>
      <h2>Search</h2>

      <label>Search by: </label>
      <select
        value={searchBy}
        onChange={(event) => setSearchBy(event.target.value)}
      >
        <option value="User">User</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Dish">Dish</option>
      </select>

      <br /><br />

      {searchBy === 'User' && <SearchByUser />}
      {searchBy === 'Restaurant' && <SearchByRestaurant />}
      {searchBy === 'Dish' && <SearchByDish />}
    </div>
  )
}

export default Search