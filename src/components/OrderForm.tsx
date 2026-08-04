import { useState, type FormEvent } from 'react';
import { api } from '../services/api';
import type { Order } from '../types';

interface OrderFormProps {
  onOrderCreated: (newOrder: Order) => void;
}

export function OrderForm({ onOrderCreated }: OrderFormProps) {
  const [cliente, setCliente] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [precoUnitario, setPrecoUnitario] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      cliente,
      enderecoEntrega,
      itens: [{ produto, quantidade: Number(quantidade), precoUnitario: Number(precoUnitario) }],
    };

    try {
      const response = await api.post<Order>('/orders', payload);
      onOrderCreated(response.data);

      setCliente('');
      setEnderecoEntrega('');
      setProduto('');
      setQuantidade(1);
      setPrecoUnitario(0);
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
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Endereço de Entrega"
          value={enderecoEntrega}
          onChange={(e) => setEnderecoEntrega(e.target.value)}
          required
          style={{ padding: '5px', width: '250px' }}
        />
      </div>

      <h4>Item do Pedido</h4>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          required
          style={{ marginRight: '5px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Qtd"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          required
          style={{ width: '60px', marginRight: '5px', padding: '5px' }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço (R$)"
          value={precoUnitario}
          onChange={(e) => setPrecoUnitario(Number(e.target.value))}
          required
          style={{ width: '90px', marginRight: '5px', padding: '5px' }}
        />
      </div>

      <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer' }}>Criar Pedido</button>
    </form>
  );
}