import { OrderModel, OrderModelProps, OrderStatus } from 'src/domain/models';
import { InfoDTO } from '../info';
import { OrderItemInfo } from './order-item.info';

export type OrderInfoProps = OrderModelProps;

export class OrderInfo extends InfoDTO<OrderInfoProps> {
  constructor(props: OrderInfoProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  totalAmount(orderItems: OrderItemInfo[]): number {
    return orderItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  }

  static from(domain: OrderModel): OrderInfo {
    return new OrderInfo(domain);
  }
}
