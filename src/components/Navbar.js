export default function Navbar({ cartCount, onOpenCart, onSearch }) {
  return (
    <nav className="navbar">
      <div className="logo" style={{fontWeight:'bold', fontSize:'20px'}}>MARKET PRO</div>
      <input type="text" placeholder="Rechercher..." className="search-input" onChange={(e) => onSearch(e.target.value)} />
      <button className="cart-btn-nav" onClick={onOpenCart} style={{cursor:'pointer'}}>
        Panier ({cartCount})
      </button>
    </nav>
  );
}
