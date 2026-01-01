import { mongooseInstance } from "@project/shared/server";
import bcrypt from "bcrypt";
import jwt,{SignOptions} from "jsonwebtoken";
import { Document , Model} from "mongoose";
import { userRoles, authProviders } from "@project/shared";

type userRolesType = typeof userRoles[number];
type authProvidersType = typeof authProviders[number];

/* ---------- Interface ---------- */
export interface IUser extends Document {
    name? : string,
    email : string,
    password? : string,
    role : userRolesType,
    avatar? : string,
    authProvider: authProvidersType,
    googleId?: string,
    // refreshTokens : string[],
    comparePassword : (userInputPassword : string) => Promise<boolean>,
    generateTokens : () => {accessToken:string, refreshToken:string},
    generateResetPasswordToken : () => string
}

/* ---------- Schema ---------- */
const userSchema = new mongooseInstance.Schema<IUser>({
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true ,select:false},
    role : {type: String, enum: userRoles ,default : 'user'},
    avatar : {type: String},
    authProvider : { type : String, enum : authProviders, default: "local"},
    googleId :{type:String,index:true,sparse:true},
    // refreshTokens : [{type:String}]
},{
    timestamps : true
})


/* ---------- Middleware ---------- */
userSchema.pre('save', async function(){
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    if(this.password) this.password = await bcrypt.hash(this.password, salt);
})

/* ---------- Methods ---------- */
userSchema.methods.comparePassword = async function (userInputPassword : string) : Promise<boolean>{
    console.log({userInputPassword})
    return bcrypt.compare(userInputPassword, this.password);
}

userSchema.methods.generateTokens = function(){
    console.log({user_id :  this._id , role : this.role})
    const accessToken  = jwt.sign(
        {user_id :  this._id , role : this.role},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions['expiresIn']}
    )


    const refreshToken  = jwt.sign(
        {user_id :  this._id, role: this.role},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions['expiresIn']}
    )

    return {accessToken, refreshToken};
}


userSchema.methods.generateResetPasswordToken = function():string{
    const resetPasswordToken  = jwt.sign(
        {user_id :  this._id},
        process.env.RESET_PASSWORD_TOKEN_SECRET as string,
        {expiresIn : process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN as SignOptions['expiresIn']}
    )

    return resetPasswordToken
}

/* ---------- Model ---------- */
export const User : Model<IUser> = mongooseInstance.models.User || mongooseInstance.model<IUser>("User", userSchema);