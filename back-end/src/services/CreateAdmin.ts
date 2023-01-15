import { prisma } from "../prisma";
import { AppErrors } from "../errors/AppErrors";
import bcrypt from "bcrypt";

export interface AdmProps {
  login: string;
  password: string;
}

export class CreateAdmin {
  async create(data: AdmProps) {
    console.log(data);
    const userExistsLogin = await prisma.admin.findUnique({
      where: {
        login: data.login,
      },
    });

    if (userExistsLogin == null) {
      const admin: AdmProps = await prisma.admin.create({
        data: {
          login: data.login,
          password: await bcrypt.hash(data.password, 10),
        },
      });
      return admin;
    } else {
      if (userExistsLogin) {
        throw new AppErrors("Login já existe!", 400);
      }
    }
  }
}
