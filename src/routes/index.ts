import { Express } from 'express'
import UserController from '../controllers/user.controller'
import validateSchema from '../middleware/validateSchema'
import { createUserSchema } from '../schemas/user.schema'

function routes(app: Express) {
    app.get('/api/user/:id', UserController.getUser)
    app.get('/api/users', UserController.getUsers)
    app.delete('/api/user/:id', UserController.deleteUser)
    app.put('/api/user/:id', validateSchema(createUserSchema), UserController.updateUserHandler)
    app.post('/api/user', validateSchema(createUserSchema), UserController.createUserHandler)
    app.post('/api/sessions', UserController.login)
}

export default routes;