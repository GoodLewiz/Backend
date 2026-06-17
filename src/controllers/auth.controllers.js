import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import userModels from '../models/user.models.js';




const generarJWT = (id) => {
   
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
};


// login 


export const login = async (req ,res)=>{

    try{
        const {email ,password}= req.body;

        const usuario = await userModels.findOne({email}).select('+password');

        if(!usuario){
            return res.status(401).json({
                msg : ' credenciales invalidas'
            });
        }


   const passwordValido = await bcrypt.compare(password, usuario.password);

     if(!passwordValido){
            return res.status(401).json({
                msg : ' contraseña  invalidas'
            });
        }


    const token = generarJWT(usuario.id)

    res.status(200).json({
        msg :  'login exitoso',
        token,
        usuario:{
            _id: usuario._id,
            name : usuario.name,
            email : usuario.email,
            role : usuario.role
        }
    })
        
    } catch (error) {
         return res.status(500).json({
                msg : ' error en el  login',
                error : error.message
            });
    }
}