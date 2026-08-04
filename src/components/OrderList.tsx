import type { Order, OrderStatus } from '../types';
import { api } from '../services/api';

interface OrderListProps {
  orders: Order[];
  onOrderUpdated: (updatedOrder: Order) => void;
}

const statusOptions: OrderStatus[] = [
  'RECEBIDO',
  'EM_PREPARO',
  'SAIU_PARA_ENTREGA',
  'ENTREGUE',
  'CANCELADO',
];

export function OrderList({ orders, onOrderUpdated }: OrderListProps) {
  const handleStatusChange = async (id: number, newStatus: OrderStatus) => {
    try {
      const response = await api.patch<Order>(`/orders/${id}/status`, { status: newStatus });
      onOrderUpdated(response.data);
    } catch (err) {
      alert('Falha ao atualizar status no servidor.');
    }
  };

  return (
    <div>
      <h3>Pedidos</h3>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '12px',
                marginBottom: '10px',
                backgroundColor: '#fafafa',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <strong>Pedido #{order.id}</strong> — Cliente: <strong>{order.cliente}</strong>
                  <br />
                  <small style={{ color: '#555' }}>Entrega em: {order.enderecoEntrega}</small>
                </div>

                <div>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    style={{ padding: '6px', fontWeight: 'bold' }}
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <small><strong>Itens:</strong></small>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  {order.itens?.map((item, idx) => (
                    <li key={idx}>
                      <small>{item.quantidade}x {item.produto} - R$ {item.precoUnitario}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}