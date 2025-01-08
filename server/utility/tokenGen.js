import jwt from "jsonwebtoken"

 const generateToken = (user)=>{
    try{
        const token = jwt.sign({ _id: user._id, email: user.email , name: user.name }, 
        process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;

    }catch(error){
        console.log(`error while token creation ${error}`);
    }
};

export default generateToken;