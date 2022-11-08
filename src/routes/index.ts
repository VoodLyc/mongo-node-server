import { Express } from 'express'
import UserController from '../controllers/user.controller'
import ProductController from '../controllers/product.controller'
import validateSchema from '../middleware/validateSchema'
import { createUserSchema } from '../schemas/user.schema'
import { createProductSchema } from '../schemas/product.schema'

function routes(app: Express) {
    //User
    app.get('/api/users/:id', UserController.getUser)
    app.get('/api/users', UserController.getUsers)
    app.delete('/api/users/:id', UserController.deleteUser)
    app.put('/api/users/:id', validateSchema(createUserSchema), UserController.updateUserHandler)
    app.post('/api/users', validateSchema(createUserSchema), UserController.createUserHandler)
    app.post('/api/sessions', UserController.login)

    //Product
    app.get('/api/products/:id', ProductController.getProduct)
    app.get('/api/products', ProductController.getProducts)
    app.delete('/api/products/:id', ProductController.deleteProduct)
    app.put('/api/products/:id', validateSchema(createProductSchema), ProductController.updateProductHandler)
    app.post('/api/products', validateSchema(createProductSchema), ProductController.createProductHandler)
}

export default routes;