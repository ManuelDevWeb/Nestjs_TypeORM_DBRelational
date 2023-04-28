// Importando entidad User
import { User } from './user.entity';
// Importando entidad Productos
import { Product } from '../../products/entities/product.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
