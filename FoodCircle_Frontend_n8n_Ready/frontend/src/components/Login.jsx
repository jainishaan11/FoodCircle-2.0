import { useState } from 'react'
import { apiUrl } from '../api'

function Login({ onLogin, onRegister, registrationMessage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      const response = await fetch(apiUrl('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      })

      if (!response.ok) {
        setError('User not found')
        return
      }

      const user = await response.json()
      onLogin(user)

    } catch (error) {
      setError('Could not connect to the server. Please try again.')
    }
  }

  return (
    <div>
      <h2>Login</h2>
        {registrationMessage && (
        <p style={{ color: 'green' }}>{registrationMessage}</p>
        )}
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

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <br />
    <br /><br />
      <p>Not a user?</p>
      <button onClick={onRegister}>Register</button>
    </div>
  )
}

export default Login
