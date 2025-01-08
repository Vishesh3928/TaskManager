/*
 users:
    name,
    Email,
    password,
 */
import mongoose, { mongo } from "mongoose"
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Name is Required']
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'enter a password'],
        // minLength:[6 , 'password length should be greater than 6 character'],
        select:false
    },
},{timestamps:true}
);

userSchema.pre('save',async function(){
        if(!this.isModified) return;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

export default mongoose.model('User',userSchema);