import { UserProps } from "../interfaces";
import { prisma } from "../prisma";

export class AttUser {
  async update(data: UserProps) {
    const upUser = await prisma.client.update({
      where: {
        id: data.id,
      },
      data: {
        address: data.address,
        cpf: data.cpf,
        email: data.email,
        number: data.number,
        name: data.name,
      },
    });
    return upUser;
  }
}
