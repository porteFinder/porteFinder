import { Container } from "typedi";
import config from "../config";

export default class PorteService {
  constructor(ContainerInstance) {
    for (const service of ContainerInstance.services) {
      this[service.id] = service.value;
    }
  }
  async login(username, password) {
    const userRecord = await this.User.findOne({ username: username });
    if (!userRecord) {
      throw new Error("Utilisateur inconnu");
    }
    this.logger.silly("Checking password");
    const isValid = await this.bcrypt.compare(password, userRecord.password);
    if (isValid) {
      this.logger.silly("Password id valid");
      this.logger.silly("Generating JWT");
      const token = this.generateToken(userRecord);
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      return { user, token };
    } else {
      throw new Error("Mot de passe incorrect");
    }
  }
  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return this.jwt.sign({ _id: user._id }, config.jwtSecret);
  }
  async findUserById(id) {
    return await this.User.findById(id);
  }
}
