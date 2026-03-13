import React, { useState } from 'react';

const CartModal = ({ cart, onClose, onCheckout, onRemove, onQty }) => {
    const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
    const [errors, setErrors] = useState({});
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    const validateForm = () => {
        let newErrors = {};
        if (customer.name.trim().length < 3) newErrors.name = "Le nom doit contenir au moins 3 caractères.";
        // Simple Algerian phone number validation (10 digits starting with 0)
        if (!/^0[567][0-9]{8}$/.test(customer.phone)) newErrors.phone = "Numéro invalide (ex: 05xx/06xx/07xx...)";
        if (customer.address.trim().length < 8) newErrors.address = "Veuillez fournir une adresse détaillée.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onCheckout(customer);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Finaliser la commande</h2>
                
                {/* Mobile Cart Items Display (visible primarily if sidebar is hidden) */}
                <div className="modal-cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="modal-cart-item">
                            <div className="modal-cart-item-info">
                                <span>{item.name}</span>
                                <small>{item.price} DA x {item.qty}</small>
                            </div>
                            <button type="button" onClick={() => onRemove(item.id)} className="modal-remove-btn">
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                <p className="modal-total">Total: <strong>{total} DA</strong></p>
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="input-group">
                        <input 
                            type="text" placeholder="Nom complet" 
                            className={errors.name ? 'input-error' : ''}
                            value={customer.name} 
                            onChange={(e) => { setCustomer({...customer, name: e.target.value}); setErrors({...errors, name: null}); }} 
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <input 
                            type="tel" placeholder="Téléphone" 
                            className={errors.phone ? 'input-error' : ''}
                            value={customer.phone} 
                            onChange={(e) => { setCustomer({...customer, phone: e.target.value}); setErrors({...errors, phone: null}); }} 
                        />
                        {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>

                    <div className="input-group">
                        <textarea 
                            placeholder="Adresse exacte (ex: 12 Rue Didouche Mourad, Alger)" 
                            className={errors.address ? 'input-error' : ''}
                            value={customer.address} 
                            onChange={(e) => { setCustomer({...customer, address: e.target.value}); setErrors({...errors, address: null}); }}
                        ></textarea>
                        {errors.address && <span className="form-error">{errors.address}</span>}
                    </div>
                    <button type="submit" className="confirm-btn">Confirmer l'achat</button>
                    <button type="button" onClick={onClose} style={{background:'none', border:'none', color:'#666', marginTop:'10px', cursor:'pointer'}}>Annuler</button>
                </form>
            </div>
        </div>
    );
};
export default CartModal;