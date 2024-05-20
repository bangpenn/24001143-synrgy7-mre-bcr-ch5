import { Model } from 'objection';
import User from './users.model';
import Car from './cars.model';

class Order extends Model {
  id!: number;
  user_id!: number;
  car_id!: number;
  start_rent!: Date;
  finish_rent!: Date;
  price!: number;
  status!: string;

  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.user_id',
          to: 'users.id',
        },
      },
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: Car,
        join: {
          from: 'orders.car_id',
          to: 'cars.id',
        },
      },
    };
  }
}

export default Order;
