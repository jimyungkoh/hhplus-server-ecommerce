import { Prisma } from '@prisma/client';
import { OrderStatus } from 'src/domain/models';

export type UpdateOrderStatusCommandProps = {
  orderId: number;
  status: OrderStatus;
  transaction?: Prisma.TransactionClient;
};

export class UpdateOrderStatusCommand {
  constructor(private readonly props: UpdateOrderStatusCommandProps) {}

  get orderId(): number {
    return this.props.orderId;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get transaction(): Prisma.TransactionClient | undefined {
    return this.props.transaction;
  }
}
