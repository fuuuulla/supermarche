export default function Cart({ cart, onRemove, onQty, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="cart">
      <h3 style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '10px'}}>Votre Panier</h3>
      {cart.length === 0 ? (
        <div className="empty-cart-state">
          <span style={{fontSize: '3rem', display:'block', marginBottom:'10px'}}>🛒</span>
          <p>Votre panier est vide</p>
          <small>Ajoutez des articles pour commencer</small>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item" style={{marginBottom: '15px'}}>
              <div>{item.name}</div>
              <div style={{fontSize: '0.9rem', color: '#666'}}>{item.price} DA x {item.qty}</div>
              <button onClick={() => onRemove(item.id)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Supprimer</button>
            </div>
          ))}
          <div style={{marginTop: '20px', fontWeight: 'bold'}}>Total: {total} DA</div>
          <button className="checkout" onClick={onCheckout}>Confirmer la commande</button>
        </>
      )}
    </div>
  );
}