import mongoose from 'mongoose';

export interface ProductInput {
    name: string,
    description: string,
    quantity: number,
    brand: string,
    owner: string
}

export interface ProductDocument extends ProductInput, mongoose.Document {
    createAt: Date;
    updateAt: Date;
}

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    owner: { type: String, required: true }
}, {
    timestamps: true
})

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel