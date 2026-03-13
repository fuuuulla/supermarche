export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">{product.price} DA</p>
        <button className="add-btn" onClick={() => onAdd(product)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
