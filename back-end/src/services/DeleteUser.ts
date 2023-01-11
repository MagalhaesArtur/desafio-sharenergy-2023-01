import { UserProps } from "../interfaces";
import { prisma } from "../prisma";

export class DeleteUser {
  async delete(data: string) {
    const user: UserProps = await prisma.client.delete({
      where: {
        id: data,
      },
    });
    return user;
  }
}
