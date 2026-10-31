import { useState } from 'react'
import { apiUrl } from '../api'

function Register({ onBack, onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    setError('')
    setMessage('')

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all three fields.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(apiUrl('users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password
        })
      })

      if (response.status === 409) {
        setError('Already a user')
        return
      }

      if (!response.ok) {
        setError('Registration failed. Please try again.')
        return
      }

      setMessage('Registration successful! Please log in.')

      setName('')
      setEmail('')
      setPassword('')

      onRegister()
    } catch (error) {
      setError('Could not connect to the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Register</h2>

      <label>Username</label>
      <br />
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter username"
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

      <label>Password</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter password"
      />

      <br /><br />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <br />
    <br /><br />
      <button onClick={onBack}>Back to Login</button>
    </div>
  )
}

export default Register
