import mongoose,{Schema,model,models} from "mongoose";
import bcrypt from "bcryptjs";

//creating an interface for the user model, this will help us to define the structure of the 
// user document in the database and also to get type checking when we use the user model in our code.
// like a variable that holds the user data, it will have the properties defined in the interface and 
// we can also use it to create new user documents in the database.
export interface UserI{
    email:string;
    password:string;
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;

}

//adding just the non optional fields
const userSchema =new Schema<UserI>({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{
    timestamps:true, 
}

);
//prehook
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        next(err);
    }
});
const User =models?.User || model<UserI>("User",userSchema)//models?.User checks if the User model already exists in the models object, if it does, it uses that, otherwise it creates a new model using the userSchema.

export default User;