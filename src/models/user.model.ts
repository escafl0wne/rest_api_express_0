import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export type UserDocument =  mongoose.Document&{
    email:string
    name:string
    password:string
    products:mongoose.Schema.Types.ObjectId[]
    createdAt:Date
    updatedAt:Date
    comparePassword: (candidatePassword:string) => Promise<boolean>
}

const userSchema = new mongoose.Schema({
email:{type:String,required:true, unique:true },
name:{type:String,required:true},
password:{type:String,required:true},
products:[{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    const user = {...this}
    const salt = await bcrypt.genSalt(config.get<number>("SALT_WORK_FACTOR"));
    const hash = await bcrypt.hashSync(user.password,salt);
    user.password = hash;
    return next();

})
// userSchema.methods.comparePassword = async function(candidatePassword:string):Promise<boolean>{
//     const user = this as UserDocument;
//     return bcrypt.compare(candidatePassword,user.password).catch(() => false);
// }
const UserModel = mongoose.model<UserDocument>("User",userSchema);

export default UserModel;