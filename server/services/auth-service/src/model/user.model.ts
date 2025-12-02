import { mongooseInstance } from "@project/shared/server";
import bcrypt from "bcrypt";
import jwt,{SignOptions} from "jsonwebtoken";


type userRoles = 'user' | 'seller' | 'admin';
export interface IUser extends Document {
    name? : string,
    email : string,
    password : string,
    role : userRoles,
    comparePassword : (userInputPassword : string) => Promise<boolean>,
    generateTokens : () => {accessToken:string, refreshToken:string},
    generateResetPasswordToken : () => string
}

const userSchema = new mongooseInstance.Schema<IUser>({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : {type: String, enum: ['user','seller','admin'] ,default : 'user'}
},{
    timestamps : true
})



userSchema.pre('save', async function(){
    // if(!this.isModified("password")) return next();
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    // next();
    if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


userSchema.methods.comparePassword = async function (userInputPassword : string){
    return bcrypt.compare(userInputPassword, this.password);
}

userSchema.methods.generateTokens = function(){
    const accessToken  = jwt.sign(
        {user_id :  this._id , role : this.role},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions['expiresIn']}
    )


    const refreshToken  = jwt.sign(
        {user_id :  this._id, role:this.role},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions['expiresIn']}
    )

    return {accessToken, refreshToken};
}


userSchema.methods.generateResetPasswordToken = function(){
    const resetPasswordToken  = jwt.sign(
        {user_id :  this._id},
        process.env.RESET_PASSWORD_TOKEN_SECRET as string,
        {expiresIn : process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN as SignOptions['expiresIn']}
    )

    return resetPasswordToken
}

export const User = mongooseInstance.model<IUser>("User", userSchema);