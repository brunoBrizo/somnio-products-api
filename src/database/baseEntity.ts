import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn } from 'typeorm';

export abstract class CustomBaseEntity extends BaseEntity {
  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt?: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt?: Date;

  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt?: Date;
}
