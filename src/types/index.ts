export type OrderStatus = 'RECEBIDO' | 'EM_PREPARO' | 'SAIU_PARA_ENTREGA' | 'ENTREGUE' | 'CANCELADO';

export interface OrderItem {
  id?: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerName: string;
  deliveryAddress: string;
  items: OrderItem[];
  status: OrderStatus;
  criadoEm?: string;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  refreshToken: string;
  expiresIn?: number;
  accessToken: string;
  userDto: User;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}
