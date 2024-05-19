import { Model } from 'objection'
import User from './users.model'
import Order from './orders.model'

class Car extends Model {
    id!: number
    user_id!: number
    name!: string
    category!: string
    price!: number
    start_rent!: Date
    finish_rent!: Date
    created_at!: Date
    updated_at!: Date

    static tableName = 'cars'

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'cars.user_id',
                to: 'users.id'
            }
        },
        orders: {
            relation: Model.HasManyRelation,
            modelClass: Order,
            join: {
                from: 'cars.id',
                to: 'orders.car_id'
            }
        }
    }
}

export default Car;