import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import type { Order } from './types';
import { api } from './services/api';

function MainApp() {
  const { user, logout, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      api.get<Order[]>('/orders')
        .then((res) => setOrders(res.data))
        .catch(() => alert('Erro ao carregar pedidos do backend.'));
    }
  }, [user]);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Login />;

  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleOrderUpdated = (updatedOrder: Order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Gerenciador de Pedidos</h2>
        <div>
          <span>Olá, <strong>{user.nome}</strong></span>
          <button onClick={logout} style={{ marginLeft: '10px', padding: '5px 10px' }}>Sair</button>
        </div>
      </header>

      <OrderForm onOrderCreated={handleOrderCreated} />
      <OrderList orders={orders} onOrderUpdated={handleOrderUpdated} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}