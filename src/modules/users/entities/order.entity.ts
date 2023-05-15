// Importando entidad User
import { User } from './user.entity';
// Importando entidad Productos
import { Product } from '../../products/entities/product.entity';
// Importando typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  ManyToMany,
} from 'typeorm';

export class Order {
  id: number;

  // @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  // Indicamos que un usuario puede tener muchas ordenes (Uno a muchos)
  // @ManyToOne()
  user: User;

  // Indicamos que una orden puede tener muchos productos (Muchos a muchos), por usar JoinTable() para generar tabla intermedia
  // @ManyToMany()
  // @JoinTable()
  products: Product[];
}
