// Importando typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

// Importando entidad a relacionar
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // Relacion Muchos a uno (Muchos productos pueden tener una marca, indicamos quien tiene la referencia desde la tabla de brand a product)
  @ManyToOne(() => Brand, (brand) => brand.products)
  // ManyToOne viene internamente con el joinColumn() y carga con la referencia
  brand: Brand;

  // Relacion Muchos a muchos (Un producto puede tener muchas categorias, indicamos quien tiene la referencia desde la tabla de category a product)
  @ManyToMany(() => Category, (category) => category.products)
  // JoinTable() solo debe ir en una de las 2 y crea la tabla intermedia
  @JoinTable()
  categories: Category[];
}
