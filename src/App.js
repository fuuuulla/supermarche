import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { api } from "./services/api";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [isLoading, setIsLoading] = useState(true);
  
  // Par défaut en mode 'dark' pour correspondre au look initial
  const [theme, setTheme] = useState("dark");

  // Gère correctement l'application du thème sur le body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["Tous", "alimentation", "snacks", "légumes", "fruits"];

  useEffect(() => {
    setIsLoading(true);
    api.get("/products").then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.error("Erreur API:", err);
      toast.error("Erreur lors du chargement des produits");
      setIsLoading(false);
    });
  }, []);

  const addToCart = (p) => {
    const exist = cart.find((i) => i.id === p.id);
    setCart(exist ? cart.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...cart, { ...p, qty: 1 }]);
    toast.success(`${p.name} ajouté au panier !`, {
      style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));
  const changeQty = (id, d) => setCart(cart.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));

  const handleCheckout = async (customerData) => {
    if (cart.length === 0) return toast.error("Le panier est vide");
    const loadingToast = toast.loading("Envoi de la commande...");
    
    try {
      await api.post("/checkout", { 
        customer: customerData, 
        items: cart, 
        total: cart.reduce((s, i) => s + i.price * i.qty, 0) 
      });
      
      toast.dismiss(loadingToast);
      toast.success("Commande envoyée avec succès ! 🎉", { duration: 4000 });
      setCart([]);
      setShowCart(false);
    } catch (e) { 
      toast.dismiss(loadingToast);
      toast.error("Erreur lors de l'envoi de la commande"); 
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) && 
    (category === "Tous" || (p.category && p.category.toLowerCase() === category.toLowerCase()))
  );

  return (
    <div className="app-container">
      <Toaster position="bottom-right" />
      <Navbar 
        cartCount={cart.reduce((total, item) => total + item.qty, 0)} 
        onOpenCart={() => setShowCart(true)} 
        onSearch={setSearch} 
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      {/* Nettoyage des styles en ligne ici pour laisser le CSS agir selon le thème */}
      <div className="filter-bar">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategory(cat)} 
            className={`filter-btn ${category === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="container">
        <div className="products-grid">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="product-card skeleton-card">
                <div className="skeleton-img"></div>
                <div className="skeleton-text title"></div>
                <div className="skeleton-text price"></div>
                <div className="skeleton-button"></div>
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
              Aucun produit trouvé.
            </p>
          )}
        </div>
        <aside className="sidebar">
          <Cart cart={cart} onRemove={removeFromCart} onQty={changeQty} onCheckout={() => setShowCart(true)} />
        </aside>
      </main>

      {showCart && (
        <CartModal 
          cart={cart} 
          onClose={() => setShowCart(false)} 
          onCheckout={handleCheckout} 
          onRemove={removeFromCart}
          onQty={changeQty}
        />
      )}
    </div>
  );
}

export default App;