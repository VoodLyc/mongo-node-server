import { Request, Response } from 'express'
import productService from '../services/product.service'
import userService from '../services/user.service'
import bcrypt from 'bcrypt'

class ProductController {
    async createProductHandler(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(res.locals.user.user_id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }

            const reqProduct = {owner: userExist._id,...req.body}
            const product = await productService.createProduct(reqProduct)
            return res.send(product)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async updateProductHandler(req: Request, res: Response) {
        try {
            const productExist = await productService.findProduct(req.params.id)
            if (productExist == null) {
                return res.status(409).send("Product does not exist")
            }

            const userExist = await userService.findUserById(res.locals.user.user_id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }

            if(productExist.owner !== userExist.id){
                return res.status(409).send("You dont have access to this product")
            }

            const reqProduct = {owner: userExist._id,...req.body}
            const product = await productService.updateProduct(req.params.id, reqProduct)
            return res.send(product)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async getProduct(req: Request, res: Response) {
        try {
            const product = await productService.findProduct(req.params.id)
            if (product == null) {
                return res.status(409).send("Product does not exist")
            }

            const userExist = await userService.findUserById(res.locals.user.user_id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }

            if(product.owner !== userExist.id){
                return res.status(409).send("You dont have access to this product")
            }

            return res.send(product)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async getProducts(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(res.locals.user.user_id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }
            const products = await productService.findProductsFromUser(userExist._id)
            return res.send(products)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try{
            const productExist = await productService.findProduct(req.params.id)
            if (productExist == null) {
                return res.status(409).send("Product does not exist")
            }

            const userExist = await userService.findUserById(res.locals.user.user_id)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }

            if(productExist.owner !== userExist.id){
                return res.status(409).send("You dont have access to this product")
            }
            
            const product = await productService.deleteProduct(req.params.id)
            return res.send(product)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }
}

export default new ProductController()