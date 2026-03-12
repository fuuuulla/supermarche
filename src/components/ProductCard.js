export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} DA</p>
      <button onClick={() => onAdd(product)}>Ajouter au panier</button>
    </div>
  );
}
