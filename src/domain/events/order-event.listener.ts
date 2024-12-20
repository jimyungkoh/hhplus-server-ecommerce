import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Effect, pipe } from 'effect';
import { Domain } from 'src/common/decorators';
import { OutboxEventRepository } from 'src/infrastructure/database/repositories/outbox-event.repository';
import { AppLogger, TransientLoggerServiceToken } from '../../common/logger';
import { CreateOrderInfo } from '../dtos';
import { OutboxEventTypes } from '../models';
import { BaseOutboxEventListener } from './base-outbox-event.listener';

@Domain()
export class OrderEventListener extends BaseOutboxEventListener {
  constructor(
    @Inject(TransientLoggerServiceToken)
    private readonly logger: AppLogger,
    protected readonly outboxEventRepository: OutboxEventRepository,
  ) {
    super(outboxEventRepository);
  }

  @OnEvent(`${OutboxEventTypes.ORDER_SUCCESS}.before_commit`, {
    async: true,
    promisify: true,
    suppressErrors: false,
  })
  async updateOrderOutboxRecord(payload: CreateOrderInfo) {
    const aggregateId = `order-${payload.order.id}`;

    return await pipe(
      this.handleBeforeCommitEvent(
        aggregateId,
        payload,
        OutboxEventTypes.ORDER_SUCCESS,
      ),
      Effect.runPromise,
    );
  }
}
