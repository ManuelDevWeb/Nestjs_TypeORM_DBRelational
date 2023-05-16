// Importando typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

// Importando entidad a relacionar
import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  // TODO: Encriptar password
  password: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // Relacion uno a uno y puede ser nulo (Indicamos quien tiene la referencia desde la tabla de customer a user)
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  // Join Column solo va en una de las dos entidades
  @JoinColumn()
  customer: Customer;
}
