import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admins', adminRoutes);

sequelize.sync().then(() => {
    console.log('Database connected and synced');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

app.get('/', (req, res) => {
    res.send('Running...');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
