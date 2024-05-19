import { Model } from 'objection'
import Car from './cars.model'
import Order from './orders.model'

class User extends Model {
    id!: number
    name!: string
    email!: string
    password!: string

    static tableName = 'users'

    static relationMappings = {
        cars: {
            relation: Model.HasManyRelation,
            modelClass: Car,
            join: {
                from: 'users.id',
                to: 'cars.user_id'
            }
        },
        orders: {
            relation: Model.HasManyRelation,
            modelClass: Order,
            join: {
                from: 'users.id',
                to: 'orders.user_id'
            }
        }
    }
}

export default User;
