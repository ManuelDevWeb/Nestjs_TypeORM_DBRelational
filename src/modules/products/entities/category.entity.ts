// Importando typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

// Importando entidad a relacionar
import { Product } from './product.entity';

@Entity({
  // Nombre tabla en la DB
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

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

  // Relacion Muchos a muchos (Una categoria puede tener muchos productos, indicamos quien tiene la referencia desde la tabla de product a category)
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
