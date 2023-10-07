import express from 'express';
import config from 'config';
import connectDB from './utils/database';
import logger from './utils/logger';
import userRoutes from './resources/user/user.routes';
import routes  from './utils/routes';
import sessionRoutes from './resources/session/session.routes';
import {getUser} from "./middleware/getUser" 
import productRoutes from './resources/product/product.routes';
const app = express();

app.use(express.json());
app.use(getUser)


const PORT = config.get<number>('PORT');
app.listen(PORT, async() => {
    await connectDB();
    
    logger.info(`Server is running on :: http://localhost:${PORT}`)
    
    routes(app)
    sessionRoutes(app,"/api/session")
    userRoutes(app,"/api/users")
    productRoutes(app,"/api/products")
    
})