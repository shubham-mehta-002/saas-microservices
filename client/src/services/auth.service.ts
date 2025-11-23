import {axiosClient} from "@/src/lib"


const registerUser = ({email} : {email:string}) => {axiosClient.post('/auth/register' , {
    email : email
})}

