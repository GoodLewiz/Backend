import mongoose from "mongoose";

const LOCAL_STRING_CONECTION = 'mongodb://localhost:27017/baseDeDatos';
 async function dbConection(){
    try{
        await mongoose.connect(LOCAL_STRING_CONECTION);
        console.log('Conectado a la base de datos');



        

    } catch (error){
     console.log(error);
     console.log('Erorr al entrar a la base de datos');
    }


}


export default dbConection;