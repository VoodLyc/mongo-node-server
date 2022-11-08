import { Request, Response } from 'express'
import productService from '../services/product.service'
import userService from '../services/user.service'
import bcrypt from 'bcrypt'

class ProductController {
    async createProductHandler(req: Request, res: Response) {
        try {
            const userExist = await userService.findUserById(req.body.owner)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }
            const product = await productService.createProduct(req.body)
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
            const userExist = await userService.findUserById(req.body.owner)
            if (userExist == null) {
                return res.status(409).send("User does not exist")
            }

            const product = await productService.updateProduct(req.params.id, req.body)
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
            return res.send(product)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }

    async getProducts(req: Request, res: Response) {
        try {
            const products = await productService.findProducts()
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
            const product = await productService.deleteProduct(req.params.id)
            return res.send(product)
        }
        catch (e: any) {
            return res.status(409).send(e.message)
        }
    }
}

export default new ProductController()