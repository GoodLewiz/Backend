


import express from 'express';
import 'dotenv/config';
import dbConection from './config/mongo.config.js';
import routerUsers from './routes/user.routes.js';
import router from './routes/auth.routes.js';

const app = express();
//middleware
app.use(express.json());
dbConection();
//endpoints
app.get('/health', (req, res)=>{
    res.json({
        msg : 'sitio funcionando :)'
    })
})


app.use('/users', routerUsers);
app.use('/auth' , router);
//Lanzar el servidor
app.listen(3000, ()=>{
    console.log(`servidor corriendo en el puerto http://localhost:3000`);
});


