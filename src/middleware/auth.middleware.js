import jtw from "jsonwebtoken";
import userModels from "../models/user.models.js";

export const proteger = async (req, res, next) => {
  try {
    let token;
    // buscar el token el en l header

    if (
      req.headers.autorization &&
      req.headers.autorization.startsWith("Bearer")
    ) {
      token = req.headers.autorization.split("")[1];
    }
    // si no existe el token  deniega el acceso
    if (!token) {
      return res.status(401).json({
        msg: "No autorizado, no hay token",
      });
    }

    const decodificado = jtw.verify(token, process.env.JWT_SECRET);

    const usuario = await userModels.findById(decodificado.id);

    if (!usuario) {
      return res.status(401)({
        msg: "el usuario de este token ya no existe",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401)({
      msg: "Token invalido o expirado",
    });
  }
};

export const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({
        msg: `El  rol ${req.usuario.role} no tiene permido para esta accion`,
      });
    }
    next();
  };
};