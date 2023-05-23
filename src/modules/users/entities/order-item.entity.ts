// Importanto typeorm
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

// Importando entidad a relacionar
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  // Relacion Muchos a uno (Un producto puede tener muchas order-product)
  @ManyToOne(() => Product)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  product: Product;

  // Relacion Muchos a uno (Una orden puede tener muchos order-product, indicamos quien tiene la referencia desde la tabla de order a orderItem)
  @ManyToOne(() => Order, (order) => order.items)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  order: Order;
}
