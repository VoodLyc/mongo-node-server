import { Request, Response } from 'express'
import userService from '../services/user.service'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { UserDocument } from '../models/user.model'

class UserController {
    async createUserHandler(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserByEmail(req.body.email)
            if (userExist !== null) {
                return res.status(409).send("User already exists")
            }

            req.body.password = await bcrypt.hash(req.body.password, 10)
            const user = await userService.createUser(req.body)
            return res.send(user)
        } catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async updateUserHandler(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(req.params.id)
            if (userExist == null) {
                return res.status(409).send("User does not exist");
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }

            const user = await userService.updateUser(req.params.id, req.body)
            return res.send(user)
        } catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(req.params.id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }
            userExist.password = ""
            return res.send(userExist)
        } catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.findUsers()
            return res.send(users)
        } catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(req.params.id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }
            const user = await userService.deleteUser(req.params.id)
            return res.send(user)
        } catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async login(req: Request, res: Response) {
        //TODO
    }
}

export default new UserController()