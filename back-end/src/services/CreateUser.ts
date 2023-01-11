import { UserProps } from "../interfaces";
import { prisma } from "../prisma";
import { AppErrors } from "../errors/AppErrors";

export class CreateUser {
  async create(data: UserProps) {
    const userExistsEmail = await prisma.client.findUnique({
      where: {
        email: data.email,
      },
    });

    const userExistsCPF = await prisma.client.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (userExistsEmail == null && userExistsCPF == null) {
      const user: UserProps = await prisma.client.create({
        data: {
          address: data.address,
          cpf: data.cpf,
          email: data.email,
          number: data.number,
          name: data.name,
        },
      });
      return user;
    } else {
      if (userExistsEmail) {
        throw new AppErrors("Email já existe!", 400);
      } else {
        throw new AppErrors("CPF já existe!", 400);
      }
    }
  }
}
