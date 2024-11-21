import { Order } from '@prisma/client';
import { OrderItemModel } from './order-item.model';

export const OrderStatus = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PAID: 'PAID',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUND_REQUESTED: 'REFUND_REQUESTED',
  REFUNDED: 'REFUNDED',
  COMPLETED: 'COMPLETED',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export type OrderModelProps = {
  id: number;
  userId: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export class OrderModel {
  readonly id: number;
  readonly userId: number;
  readonly status: OrderStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: OrderModelProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  totalAmount(orderItems: OrderItemModel[]): number {
    return orderItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }

  static from(order: Order): OrderModel {
    return new OrderModel({
      id: Number(order.id),
      userId: order.userId,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }
}