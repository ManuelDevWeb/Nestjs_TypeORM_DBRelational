// Importanto typeorm
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

// Importando entidad a relacionar
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity({
  // Nombre tabla en la DB
  name: 'order_items',
})
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  // Excluyendo al momento de retornar la informacion al cliente
  @Exclude()
  @CreateDateColumn({
    // Nombre de la columna en la DB
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  // Excluyendo al momento de retornar la informacion al cliente
  @Exclude()
  @UpdateDateColumn({
    // Nombre de la columna en la DB
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  // Relacion Muchos a uno (Un producto puede tener muchas order-product)
  @ManyToOne(() => Product)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  @JoinColumn({
    // Nombre de la columna en la DB
    name: 'product_id',
  })
  product: Product;

  // Relacion Muchos a uno (Una orden puede tener muchos order-product, indicamos quien tiene la referencia desde la tabla de order a orderItem)
  @ManyToOne(() => Order, (order) => order.items)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  @JoinColumn({
    // Nombre de la columna en la DB
    name: 'order_id',
  })
  order: Order;
}
