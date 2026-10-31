
function MainMenu({ onCreateOrder, onSearch, onLogout }) {
  return (
    <div>
      <h2>Main Menu</h2>

      <button onClick={onCreateOrder}>
        Create a New Order
      </button>

      <br /><br />

      <button onClick={onSearch}>
        Search by User / Restaurant / Dish
      </button>

      <br /><br />

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default MainMenu
