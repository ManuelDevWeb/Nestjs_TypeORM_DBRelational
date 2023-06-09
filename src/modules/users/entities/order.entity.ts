// Importando typeorm
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer/types/decorators';

// Importando entidad a relacionar
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity(
  // Nombre de la tabla en la DB
  {
    name: 'orders',
  },
)
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    // Nombre de la columna en la DB
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    // Nombre de la columna en la DB
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  // Relacion Muchos a uno (Un customer puede tener muchas ordenes, indicamos quien tiene la referencia desde la tabla de customer a order)
  @ManyToOne(() => Customer, (customer) => customer.orders)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  @JoinColumn(
    // Nombre de la columna en la DB
    { name: 'customer_id' },
  )
  customer: Customer;

  // Relacion uno a muchos (Una orden puede tener muchos order-item, indicamos quien tiene la referencia desde la tabla de order a orderItem)
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  // Agregamos un campo nuevo para retornar bien la info (Esto se reflejara al llamar el get order)
  @Expose()
  // products se llamara el campo
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => item !== null)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id,
        }));
    }

    return [];
  }

  // Agregamos un campo nuevo para retornar mas info (Esto se reflejara al llamar el get order)
  @Expose()
  // total se llamara el campo
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => item !== null)
        .reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    }

    return [];
  }
}
