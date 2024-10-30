import { UserDomain } from 'src/infrastructure/dtos/domains';

export type UserInfoProps = Omit<UserDomain, 'password'>;

export class UserInfo {
  constructor(private readonly props: UserInfoProps) {}

  get id(): number {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static from(domain: UserDomain): UserInfo {
    const { id, email, createdAt, updatedAt } = domain;
    return new UserInfo({ id, email, createdAt, updatedAt });
  }
}