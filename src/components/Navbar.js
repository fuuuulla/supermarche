import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onOpenCart, onSearch, theme, onToggleTheme }) {
  const [bump, setBump] = useState(false);

  // Trigger animation when cartCount changes
  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);
  return (
    <nav className="navbar">
      {/* اللوغو الآن يأخذ الستايل من App.css تلقائياً */}
      <div className="logo">MARKET PRO</div>

      {/* وضعنا حقل البحث داخل div لتنظيمه في الوسط */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>

      {/* Actions container for Theme Toggle and Cart */}
      <div className="nav-actions">
        <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle Dark Mode" title="Activer/Désactiver le Mode Sombre">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button className={`cart-icon-btn ${bump ? 'bump' : ''}`} onClick={onOpenCart}>
          🛒 Panier ({cartCount})
        </button>
      </div>
    </nav>
  );
}
