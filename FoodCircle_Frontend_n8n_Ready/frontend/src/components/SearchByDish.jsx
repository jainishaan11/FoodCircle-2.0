import { useState } from 'react'
import { apiUrl } from '../api'

function SearchByDish({ onBack }) {
  const [dishName, setDishName] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch() {
    if (!dishName.trim()) {
      setError('Please enter a dish name.')
      return
    }

    setLoading(true)
    setError('')
    setResults([])
    setSearched(false)

    try {
      const dish = encodeURIComponent(dishName.trim())
      const restaurant = restaurantName.trim()
        ? `&restaurantName=${encodeURIComponent(restaurantName.trim())}`
        : ''
      const place = location.trim()
        ? `&location=${encodeURIComponent(location.trim())}`
        : ''

      const response = await fetch(
        apiUrl(`rbm/search/dish?dishName=${dish}${restaurant}${place}`)
      )

      if (!response.ok) {
        throw new Error('Search failed.')
      }

      const data = await response.json()
      setResults(data)
      setSearched(true)
    } catch {
      setError('Could not fetch results. Check that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Search By Dish</h2>

      <label>Dish Name</label>
      <br />
      <input
        value={dishName}
        onChange={(event) => setDishName(event.target.value)}
        placeholder="Enter dish name"
      />

      <br /><br />

      <label>Restaurant Name (optional)</label>
      <br />
      <input
        value={restaurantName}
        onChange={(event) => setRestaurantName(event.target.value)}
        placeholder="Enter restaurant name or leave blank"
      />

      <br /><br />

      <label>Location (optional)</label>
      <br />
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Enter location or leave blank"
      />

      <br /><br />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      <br /><br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searched && results.length === 0 && (
        <p>No orders found for this dish.</p>
      )}

      {results.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>User</th>
              <th>Restaurant</th>
              <th>Location</th>
              <th>User's Avg Rating</th>
              <th>User's Orders</th>
              <th>Overall Avg Rating</th>
              <th>Total Orders</th>
              <th>Unique Users</th>
              <th>Rating Engine</th>
              <th>Popularity Trend</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index}>
                <td>{item.userName}</td>
                <td>{item.restaurantName}</td>
                <td>{item.location}</td>
                <td>{item.userAverageRating}</td>
                <td>{item.userOrderCount}</td>
                <td>{item.overallAverageRating}</td>
                <td>{item.totalOrders}</td>
                <td>{item.uniqueUsers}</td>
                <td>{item.ratingCategory}</td>
                <td>{item.popularityTrend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      {onBack && <button onClick={onBack}>Back to Menu</button>}
    </div>
  )
}

export default SearchByDish