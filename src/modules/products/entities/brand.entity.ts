// Importando typeorm
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  imagen: string;
}
