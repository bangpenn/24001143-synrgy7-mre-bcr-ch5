import express, { Express, Request, Response } from 'express'
import knex from 'knex'
import { Model } from 'objection'
import User from './models/users.model'
import Car from './models/cars.model'
import Order from './models/orders.model'

const app: Express = express()
const port = 8000

const knexInstance = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '1234',
        database: 'CH_05',
    },
})

Model.knex(knexInstance);

app.use(express.json());

app.get('/', (_, res: Response) => {
    res.send('Express + TypeScript Server');
});

// Endpoint untuk menampilkan semua pengguna
app.get('/users', async (_, res: Response) => {
    try {
        const users = await User.query().withGraphFetched('[cars, orders]');
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Endpoint untuk menampilkan satu pengguna berdasarkan ID
app.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.query().findById(id).withGraphFetched('[cars, orders]');
        if (user) {
            res.json({ data: user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Error fetching user by ID' });
    }
});

// Endpoint untuk membuat pengguna baru
app.post('/users', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.query().insert({ name, email, password });
        res.status(201).json({ data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Endpoint untuk mengupdate pengguna berdasarkan ID
app.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await User.query().patchAndFetchById(id, { name, email, password });
        res.json({ data: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Endpoint untuk menghapus pengguna berdasarkan ID
app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await User.query().deleteById(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Endpoint untuk menampilkan semua mobil
app.get('/cars', async (_, res: Response) => {
    try {
        const cars = await Car.query().withGraphFetched('owner');
        res.json({ data: cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Error fetching cars' });
    }
});

// Endpoint untuk menampilkan satu mobil berdasarkan ID
app.get('/cars/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const car = await Car.query().findById(id).withGraphFetched('owner');
        if (car) {
            res.json({ data: car });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).json({ error: 'Error fetching car by ID' });
    }
});

// Endpoint untuk membuat mobil baru
app.post('/cars', async (req: Request, res: Response) => {
    const { user_id, name, category, price, start_rent, finish_rent } = req.body;
    try {
        const newCar = await Car.query().insert({ user_id, name, category, price, start_rent, finish_rent });
        res.status(201).json({ data: newCar });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Error creating car' });
    }
});

// Endpoint untuk mengupdate mobil berdasarkan ID
app.put('/cars/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, start_rent, finish_rent } = req.body;
    try {
        const updatedCar = await Car.query().patchAndFetchById(id, { name, category, price, start_rent, finish_rent });
        res.json({ data: updatedCar });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Error updating car' });
    }
});

// Endpoint untuk menghapus mobil berdasarkan ID
app.delete('/cars/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Car.query().deleteById(id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'Error deleting car' });
    }
});

// Endpoint untuk menampilkan semua pesanan
app.get('/orders', async (_, res: Response) => {
    try {
        const orders = await Order.query().withGraphFetched('[user, car]');
        res.json({ data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Endpoint untuk menampilkan satu pesanan berdasarkan ID
app.get('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.query().findById(id).withGraphFetched('[user, car]');
        if (order) {
            res.json({ data: order });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: 'Error fetching order by ID' });
    }
});

// Endpoint untuk membuat pesanan baru
app.post('/orders', async (req: Request, res: Response) => {
    const { user_id, car_id, start_rent, finish_rent, price, status } = req.body;
    try {
        const newOrder = await Order.query().insert({ user_id, car_id, start_rent, finish_rent, price, status });
        res.status(201).json({ data: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

// Endpoint untuk mengupdate pesanan berdasarkan ID
app.put('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { start_rent, finish_rent, price, status } = req.body;
    try {
        const updatedOrder = await Order.query().patchAndFetchById(id, { start_rent, finish_rent, price, status });
        res.json({ data: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Error updating order' });
    }
});

// Endpoint untuk menghapus pesanan berdasarkan ID
app.delete('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Order.query().deleteById(id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Error deleting order' });
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});