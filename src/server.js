import express from 'express';
import 'dotenv/config';
import db from './db/db.js'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT||8000;

app.use(express.json());
db();
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);


app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
})