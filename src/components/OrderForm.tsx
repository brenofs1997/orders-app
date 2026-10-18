import { useState, type FormEvent } from 'react';
import { api } from '../services/api';
import type { Order } from '../types';

interface OrderFormProps {
  onOrderCreated: (newOrder: Order) => void;
}

export function OrderForm({ onOrderCreated }: OrderFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      customerName,
      deliveryAddress,
      items: [{ name, quantity: Number(quantity), unitPrice: Number(unitPrice) }],
    };

    try {
      const response = await api.post<Order>('/orders', payload);
      onOrderCreated(response.data);

      setCustomerName('');
      setDeliveryAddress('');
      setName('');
      setQuantity(0);
      setUnitPrice(0);
    } catch (err) {
      alert('Erro ao criar pedido. Verifique a conexão com o backend.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Novo Pedido</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Endereço de Entrega"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          required
          style={{ padding: '5px', width: '250px' }}
        />
      </div>

      <h4>Item do Pedido</h4>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: '5px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Qtd"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          style={{ width: '60px', marginRight: '5px', padding: '5px' }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço (R$)"
          value={unitPrice}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
          required
          style={{ width: '90px', marginRight: '5px', padding: '5px' }}
        />
      </div>

      <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer' }}>Criar Pedido</button>
    </form>
  );
}