export default function CartModal({ cart, onClose, onRemove, onQty }) {
  const total = cart.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  return (
    <div className="overlay">
      <div className="modal">
        <h3>🛍 Panier</h3>

        {cart.length === 0 && <p>Panier vide</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <div>
              <button onClick={() => onQty(item.id, -1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => onQty(item.id, 1)}>+</button>
              <button onClick={() => onRemove(item.id)}>❌</button>
            </div>
          </div>
        ))}

        <h4>Total: {total} DA</h4>

        <button className="checkout">Checkout</button>
        <button className="close" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}
