import { useState } from 'react'
import { apiUrl } from '../api'

function SearchByUser({ onBack }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch() {
    if (!name.trim() || !email.trim()) {
      setError('Please enter both name and email.')
      return
    }

    setLoading(true)
    setError('')
    setResults([])
    setSearched(false)

    try {
      const userName = encodeURIComponent(name.trim())
      const userEmail = encodeURIComponent(email.trim())

      const response = await fetch(
        apiUrl(`rbm/user/${userName}/${userEmail}`)
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
      <h2>Search By User</h2>

      <label>User Name</label>
      <br />
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter user name"
      />

      <br /><br />

      <label>Email</label>
      <br />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
      />

      <br /><br />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      <br /><br />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searched && results.length === 0 && (
        <p>No orders found for this user.</p>
      )}

      {results.length > 0 && (
  <table border="1" cellPadding="8">
    <thead>
      <tr>
        <th>Dish</th>
        <th>Restaurant</th>
        <th>Location</th>
        <th>Your Avg Rating</th>
        <th>Your Orders</th>
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
          <td>{item.dishName}</td>
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

    </div>
  )
}

export default SearchByUser