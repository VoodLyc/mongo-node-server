import mongoose from 'mongoose';

export interface UserInput {
    name: string,
    email: string,
    username: string,
    password: string,
    active: boolean
}

export interface UserDocument extends UserInput, mongoose.Document {
    createAt: Date;
    updateAt: Date;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true }
}, {
    timestamps: true,
})

const UserModel = mongoose.model<UserDocument>("User", userSchema)

export default UserModel