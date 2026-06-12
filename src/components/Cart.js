export default function Cart({ cart, onRemove, onQty, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="cart">
      <h3>Votre Panier</h3>
      {cart.length === 0 ? (
        <div className="empty-cart-state">
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}>🛒</span>
          <p>Votre panier est vide</p>
          <small>Ajoutez des articles pour commencer</small>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              {/* Infos produit à gauche */}
              <div className="cart-item-info">
                <span className="cart-item-title">{item.name}</span>
                <span className="cart-item-price">{item.price} DA</span>
              </div>
              
              {/* Actions (Quantité + Supprimer) à droite */}
              <div className="cart-item-actions">
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onQty(item.id, -1)}>-</button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onQty(item.id, 1)}>+</button>
                </div>
                <button className="cart-item-remove-btn" onClick={() => onRemove(item.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total-section">
            Total: <span>{total} DA</span>
          </div>
          <button className="checkout" onClick={onCheckout}>Confirmer la commande</button>
        </>
      )}
    </div>
  );
}