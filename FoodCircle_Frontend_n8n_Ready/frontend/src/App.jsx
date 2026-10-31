import { useState } from 'react'
import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import MainMenu from './components/MainMenu'
import CreateOrder from './components/CreateOrder'
import Search from './components/Search'

function App() {
  const [page, setPage] = useState('login')
  const [registrationMessage, setRegistrationMessage] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)

  function handleLogin(user) {
    setLoggedInUser(user)
    setRegistrationMessage('')
    setPage('menu')
  }

  function handleRegister() {
  setRegistrationMessage('Registration successful! Please log in.')
  setPage('login')
  }

  function handleLogout() {
    setLoggedInUser(null)
    setPage('login')
  }

  return (
    <div>
      <h1>FoodCircle</h1>
      <p>Discover food worth returning to.</p>
      <hr />


    {page === 'login' && (
    <Login
    onLogin={handleLogin}
    onRegister={() => setPage('register')}
    registrationMessage={registrationMessage}
    />
    )}


      {page === 'register' && (
        <Register
          onBack={() => setPage('login')}
          onRegister={handleRegister}
        />
      )}


  {page === 'menu' && (
  <div>
    <h2>Hello, {loggedInUser?.name}!</h2>
    <br></br>
    <MainMenu
      onCreateOrder={() => setPage('order')}
      onSearch={() => setPage('search')}
      onLogout={handleLogout}
    />
  </div>
  )}


      {page === 'order' && (
        <CreateOrder
          onBack={() => setPage('menu')}
          user={loggedInUser}
        />
      )}

      {page === 'search' && (
        <div>
          <Search />
          <br />
          <button onClick={() => setPage('menu')}>
            Back to Menu
          </button>
        </div>
      )}
    </div>
  )
}

export default App