import { useState } from 'react'
import { apiUrl } from '../api'

function CreateOrder({ onBack, user }) {
  const [dish, setDish] = useState('')
  const [orderRestaurant, setOrderRestaurant] = useState('')
  const [orderLocation, setOrderLocation] = useState('')
  const [rating, setRating] = useState('5')
  const [orderTime, setOrderTime] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleOrder() {
    setMessage('')
    setError('')

    if (
      !dish.trim() ||
      !orderRestaurant.trim() ||
      !orderLocation.trim() ||
      !orderTime ||
      !rating
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (!user?.name || !user?.email) {
      setError('Please log in again before creating an order.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(apiUrl('orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          dishName: dish.trim(),
          restaurantName: orderRestaurant.trim(),
          restaurantLocation: orderLocation.trim(),
          rating: Number(rating),
          orderedAt: orderTime
        })
      })

      const result = await response.text()

      if (response.status === 409) {
        setError('Sorry, it already exists!')
        return
      }

      if (!response.ok) {
        setError(result || 'Could not save the order.')
        return
      }

      setMessage('Order created')

      setDish('')
      setOrderRestaurant('')
      setOrderLocation('')
      setRating('5')
      setOrderTime('')
    } catch (error) {
      setError('Could not connect to the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Create a New Order</h2>

      <br /><br />

      <label>Dish name</label>
      <br />
      <input
        value={dish}
        onChange={(event) => setDish(event.target.value)}
        placeholder="Enter dish name"
        required
      />

      <br /><br />

      <label>Restaurant Name</label>
      <br />
      <input
        value={orderRestaurant}
        onChange={(event) => setOrderRestaurant(event.target.value)}
        placeholder="Enter restaurant name"
        required
      />

      <br /><br />

      <label>Location</label>
      <br />
      <input
        value={orderLocation}
        onChange={(event) => setOrderLocation(event.target.value)}
        placeholder="Enter location"
        required
      />

      <br /><br />

      <label>Date and Time</label>
      <br />
      <input
        type="datetime-local"
        value={orderTime}
        onChange={(event) => setOrderTime(event.target.value)}
        required
      />

      <br /><br />

      <label>Rating (1–5)</label>
      <br />
      <select
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        required
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <br /><br />

      <button onClick={handleOrder} disabled={loading}>
        {loading ? 'Saving...' : 'Save Order'}
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <br />
      <br /><br />
      <button onClick={onBack}>Back to Menu</button>
    </div>
  )
}

export default CreateOrder