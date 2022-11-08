import { Express } from 'express'
import UserController from '../controllers/user.controller'
import ProductController from '../controllers/product.controller'
import validateSchema from '../middleware/validateSchema'
import { createUserSchema } from '../schemas/user.schema'
import { createProductSchema } from '../schemas/product.schema'
import verifyToken from '../middleware/auth'

function routes(app: Express) {
    //User
    app.get('/api/users/:id', UserController.getUser)
    app.get('/api/users', UserController.getUsers)
    app.delete('/api/users/:id', UserController.deleteUser)
    app.put('/api/users/:id', validateSchema(createUserSchema), UserController.updateUserHandler)
    app.post('/api/users', validateSchema(createUserSchema), UserController.createUserHandler)
    
    //Authentication
    app.post('/api/authentication', UserController.login)

    //Product
    app.get('/api/products/:id', verifyToken, ProductController.getProduct)
    app.get('/api/products', verifyToken, ProductController.getProducts)
    app.delete('/api/products/:id', verifyToken, ProductController.deleteProduct)
    app.put('/api/products/:id', verifyToken, validateSchema(createProductSchema), ProductController.updateProductHandler)
    app.post('/api/products', verifyToken, validateSchema(createProductSchema), ProductController.createProductHandler)
}

export default routes;