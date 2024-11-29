-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('PENDING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUND_REQUESTED', 'REFUNDED', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING_PAYMENT';