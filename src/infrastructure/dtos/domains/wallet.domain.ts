import { Wallet } from '@prisma/client';
import { ErrorCodes } from 'src/common/errors';
import { AppConflictException } from 'src/domain/exceptions';

export type WalletDomainProps = {
  id: number;
  userId: number;
  totalPoint: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export class WalletDomain {
  constructor(private readonly props: WalletDomainProps) {}

  get id(): number {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get totalPoint(): number {
    return this.props.totalPoint;
  }

  get version(): number {
    return this.props.version;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  payable(amount: number): boolean {
    if (this.totalPoint < amount) {
      throw new AppConflictException(ErrorCodes.WALLET_INSUFFICIENT_POINT);
    }

    return true;
  }

  static from(wallet: Wallet): WalletDomain {
    return new WalletDomain({
      id: Number(wallet.id),
      userId: Number(wallet.userId),
      totalPoint: Number(wallet.totalPoint),
      version: Number(wallet.version),
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    });
  }
}
