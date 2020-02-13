import jwt from "jsonwebtoken";
import config from "../../config";
import AuthService from "../../services/auth";
import { Container } from "typedi";

const handleToken = async request => {
  const { bearer } = request.headers;
  if (!bearer) return false;
  const user = await User.findOne({ bearer: bearer });
  if (!user) return false;
  return true;
};

const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  const authServiceInstance = Container.get(AuthService);
  const logger = Container.get("logger");
  try {
    if (!token) {
      throw new Error("No token found.");
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await authServiceInstance.findUserById(decoded._id);
    req.user = user;
    next();
  } catch (e) {
    logger.error("error: %o", e);
    e.status = 401;
    next(e);
  }
};

export default isAuth;
