// Importando typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

// Importando entidad a relacionar
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity({
  // Nombre de la tabla en la DB
  name: 'customers',
})
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

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

  // Relacion uno a uno y puede ser nulo (Indicamos quien tiene la referencia desde la tabla de user a customer)
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  // Relacion uno a Mucho (Un customer puede tener muchas ordenes, indicamos quien tiene la referencia desde la tabla de order a customer)
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
