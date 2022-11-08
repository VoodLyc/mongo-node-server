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
            const product = await ProductModel.findOneAndUpdate({ _id: id}, input, {
                new: true
            })
            return product?.toJSON()
        }
        catch (e: any) {
            throw new Error(e)
        }
    }
}

export default new ProductService()