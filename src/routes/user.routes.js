import { Router} from "express";
import controllerUser from "../controllers/users.controllers.js";

const routerUsers = Router();

routerUsers.post('/', controllerUser.createUser);
routerUsers.get('/',controllerUser.getUser);
routerUsers.get('/:id', controllerUser.getUserById);
routerUsers.put('/:id', controllerUser.updateUser);
routerUsers.delete('/:id', controllerUser.deleteUser);

export default routerUsers;
