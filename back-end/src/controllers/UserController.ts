import { AppErrors } from "../errors/AppErrors";
import { AdmProps } from "../interfaces";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async Login(data: AdmProps) {
    const userExistsLogin = await prisma.admin.findUnique({
      where: {
        login: data.login,
      },
    });
    if (!userExistsLogin) {
      throw new AppErrors("Username ou senha não existem", 400);
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
          expiresIn: 60 * 60,
        }
      );
      const { password, ...user } = userExistsLogin;
      return { user, token };
    } else {
      throw new AppErrors("Username ou senha não existem", 400);
    }
  }
}
