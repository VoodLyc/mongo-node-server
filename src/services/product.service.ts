import ProductModel, { ProductDocument, ProductInput } from '../models/product.model'

class ProductService {
    async createProduct(input: ProductInput) {
        try {
            const product = await ProductModel.create(input)
            return product.toJSON()
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async updateProduct(id: string, input: ProductInput) {
        try {
            const product = await ProductModel.findOneAndUpdate({ _id: id }, input, {
                new: true
            })
            return product?.toJSON()
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async findProduct(id: string) {
        try {
            const user = await ProductModel.findOne({ _id: id })
            return user
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async findProducts() {
        try {
            const products = await ProductModel.find({})
            return products
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async deleteProduct(id: string) {
        try {
            const product = await ProductModel.deleteOne({ _id: id})
            return product
        }
        catch (e: any) {
            throw new Error(e)
        }
    }
}

export default new ProductService()