import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, //save hash
    role: { type: String, enum: ['admin', 'seller','provider'], default: 'provider' },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    status: { type: String, enum: ['active', 'inactive','banned'], default: 'active' },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {  
    //Automatically perform password hashing before actually saving to the database 
    if (!this.isModified('password')) return next();
    //hash only when the password field is set or modified for the first time
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);
//Here, ModelClass is a subclass inherited from Mongoose.Model
// User is a "subclass" that inherits all the behaviors of the Model
//Inheritance chain: User <- Model 