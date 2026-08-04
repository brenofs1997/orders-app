export type OrderStatus = 'RECEBIDO' | 'EM_PREPARO' | 'SAIU_PARA_ENTREGA' | 'ENTREGUE' | 'CANCELADO';

export interface OrderItem {
  id?: number;
  produto: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Order {
  id: number;
  cliente: string;
  enderecoEntrega: string;
  itens: OrderItem[];
  status: OrderStatus;
  criadoEm?: string;
}

export interface User {
  nome: string;
  email: string;
}

export interface AuthResponse {
  refreshToken?: string;
  expiresIn?: number;
  accessToken: string;
  userDto: User;
}