import { CustomBaseEntity } from '@database/baseEntity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('product')
export class Product extends CustomBaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column('simple-array', { nullable: false })
  tags: string[];
}
