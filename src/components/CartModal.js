import React, { useState } from 'react';

const CartModal = ({ cart, onClose, onCheckout }) => {
    const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCheckout(customer);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-popup" onClick={onClose}>&times;</button>
                <h2>Finaliser la commande</h2>
                
                <div className="order-summary">
                    <p>Total à payer: <strong>{total} DA</strong></p>
                </div>

                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="input-group">
                        <label>Nom complet</label>
                        <input type="text" placeholder="Ex: Ahmed Ben" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} required />
                    </div>

                    <div className="input-group">
                        <label>Téléphone</label>
                        <input type="tel" placeholder="05XX XX XX XX" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} required />
                    </div>

                    <div className="input-group">
                        <label>Adresse de livraison</label>
                        <textarea placeholder="Votre adresse exacte" value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} required></textarea>
                    </div>

                    <button type="submit" className="confirm-btn">Confirmer l'achat</button>
                </form>
            </div>
        </div>
    );
};

export default CartModal;