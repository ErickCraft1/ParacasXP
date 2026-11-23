import express from 'express';
import { apiRoutes } from './routes/api.routes.ts';

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;