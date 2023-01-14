import { AppErrors } from "../errors/AppErrors";
import { AdmProps } from "../interfaces";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async Login(data: AdmProps) {
    console.log(data);
    var rememberMe = data.rememberMe;
    const userExistsLogin = await prisma.admin.findUnique({
      where: {
        login: data.login,
      },
    });
    if (!userExistsLogin) {
      throw new AppErrors("Login ou Senha inválidos!", 400);
    }
    const verifyPass = await bcrypt.compare(
      data.password,
      userExistsLogin.password
    );
    if (verifyPass) {
      const token = jwt.sign(
        { id: userExistsLogin.id },
        process.env.JWT_PASS || "",
        {
          expiresIn: rememberMe ? "1d" : 60 * 60,
        }
      );
      const { password, ...user } = userExistsLogin;
      return { user, token };
    } else {
      throw new AppErrors("Login ou Senha inválidos!", 400);
    }
  }
}
