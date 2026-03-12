import { useEffect, useState } from "react";
import { api } from "./services/api";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");

  const categories = ["Tous", "alimentation", "snacks", "légumes", "fruits"];

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    }).catch(err => console.error("Erreur API:", err));
  }, []);

  const addToCart = (p) => {
    const exist = cart.find((i) => i.id === p.id);
    setCart(exist ? cart.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...cart, { ...p, qty: 1 }]);
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));
  const changeQty = (id, d) => setCart(cart.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Panier vide");
    try {
      await api.post("/checkout", { items: cart, total: cart.reduce((s, i) => s + i.price * i.qty, 0) });
      alert("Commande envoyée avec succès !");
      setCart([]);
      setShowCart(false);
    } catch (e) { alert("Erreur lors de l'envoi"); }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) && 
    (category === "Tous" || (p.category && p.category.toLowerCase() === category.toLowerCase()))
  );

  return (
    <div className="app-container">
      <Navbar cartCount={cart.length} onOpenCart={() => setShowCart(true)} onSearch={setSearch} />

      <div className="filter-bar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={category === cat ? "active" : ""}>
            {cat}
          </button>
        ))}
      </div>

      <main className="container">
        <div className="products-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
        <aside className="sidebar">
          <Cart cart={cart} onRemove={removeFromCart} onQty={changeQty} onCheckout={handleCheckout} />
        </aside>
      </main>

      {showCart && (
        <CartModal cart={cart} onClose={() => setShowCart(false)} onRemove={removeFromCart} onQty={changeQty} onCheckout={handleCheckout} />
      )}
    </div>
  );
}

export default App;