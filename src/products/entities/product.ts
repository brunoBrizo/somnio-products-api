import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column('simple-array', { nullable: false })
  tags: string[];
}
