import bcrypt from 'bcryptjs';
import userModels from '../models/user.models.js';



const controllerUser = {

   createUser : async(req, res)=>{
        
        try {
            let {name, email , password ,role}=req.body;
            
            const UserExist = await userModels.findOne({email})
            if (UserExist){
                return res.status(400).json({
                    msg : 'incorrecto el correo ya esta registrado',
                    data : null
                    
                })
            }

            // 2 asignar rol por defecto
            if (!role){
                role ='user'
            }


            // 3 encriptar
            const passwordProtedted = await bcrypt.hash(password, 8);
            const newUser = new userModels({
                name,
                email,
                password : passwordProtedted,
                role,
            });

                console.log(passwordProtedted)
            const userCreate = await newUser.save();

            if(userCreate._id){
               return res.status(201).json({
                    result: 'correcto',
                    msg : 'usuario creado',
                    data :{
                        _id : userCreate._id,
                        name : userCreate.name,
                        email : userCreate.email,
                        role : userCreate.role,
                    }
                })
            }

        } catch (error) {
            console.log("error es ", error)
            return res.status(500).json({
                    msg : 'error al crear el usuario',
                    data : error.message
                    
                })
        }


    },

    getUser : async (req, res)=>{
        try {
            const allUserFound = await userModel.find();
            res.json ({
                     result: 'correcto',
                    msg : 'usuarios obtenidos',
                    data : allUserFound,
            })
        } catch (error) {
            res.json({
                 result: 'error',
                    msg : 'error al obtener los usuarios',
                    data : error,
            })
        }
    },


    getUserById : async (req,res)=>{
        try {
            const userFound = await userModel.findById(
                req.params.id
            );
            if(userFound._id){
                res.json({
                    result: 'correcto',
                    msg : 'usuario obtenido  por¿ id',
                    data : userFound,
                })
            }

        } catch (error) {
            res.json({
                    result: 'error',
                    msg : 'error al obtener el usuario por id',
                    data : error,
            })
        }
    },


       updateUser: async (req, res) => {
        try {
            const dataUpdate = { ...req.body };

            // Si el usuario envía una nueva contraseña, la encriptamos
            if (dataUpdate.password) {
                dataUpdate.password = await bcrypt.hash(dataUpdate.password, 8);
            }

            const userUpdate = await userModel.findByIdAndUpdate(
                req.params.id,
                dataUpdate, // <-- CORREGIDO: Usamos dataUpdate en lugar de req.body
                { new: true } // <-- MEJORA: Esto hace que te devuelva el usuario con los datos ya actualizados
            );

            if (userUpdate._id) {
                res.json({
                    result: 'correcto',
                    msg: 'usuario actualizado',
                    data: userUpdate,
                });
            }

        } catch (error) {
            res.json({
                result: 'error',
                msg: 'error al actualizar',
                data: error.message,
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userDelete = await userModel.findByIdAndDelete(id);

            if (!userDelete) {
                return res.status(404).json({ // <-- CORREGIDO: Agregado el 'return' y un status 404
                    result: 'incorrecto',
                    msg: 'usuario no encontrado o ya eliminado',
                });
            }

            res.status(200).json({
                result: 'correcto',
                msg: 'usuario eliminado',
                data: userDelete, // <-- CORREGIDO: La variable correcta es userDelete
            });

        } catch (error) {
            res.status(500).json({
                result: 'error',
                msg: 'error al eliminar',
                data: error.message,
            });
        }
    }
}



export default controllerUser;