// Importando typeorm
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 230, unique: true })
  name: string;

  @Column({ type: 'text' })
  imagen: string;
}
