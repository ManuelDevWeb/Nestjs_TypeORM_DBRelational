// Importando typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Importando entidad a relacionar
import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 230, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  imagen: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // Relacion uno a Mucho (Una marca puede tener muchos productos, indicamos quien tiene la referencia desde la tabla de product a brand)
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
