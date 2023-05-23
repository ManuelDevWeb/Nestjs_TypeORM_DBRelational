// Importando typeorm
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Importando entidad a relacionar
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // Relacion Muchos a uno (Un customer puede tener muchas ordenes, indicamos quien tiene la referencia desde la tabla de customer a order)
  @ManyToOne(() => Customer, (customer) => customer.orders)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  customer: Customer;

  // Relacion uno a muchos (Una orden puede tener muchos order-item, indicamos quien tiene la referencia desde la tabla de order a orderItem)
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}
