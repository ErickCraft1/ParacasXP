import { Router } from 'express';
import { getUsers } from '../controllers/user.controller.ts';
import { getProducts } from '../controllers/product.controller.ts';

export const apiRoutes = Router();

apiRoutes.get('/users', getUsers);
apiRoutes.get('/products', getProducts);