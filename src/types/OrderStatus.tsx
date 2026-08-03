export type OrderStatus = 'RECEBIDO' | 'EM_PREPARO' | 'SAIU_PARA_ENTREGA' | 'ENTREGUE ' | 'CANCELADO ';

export interface Order {
  id: number;
  item: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
}