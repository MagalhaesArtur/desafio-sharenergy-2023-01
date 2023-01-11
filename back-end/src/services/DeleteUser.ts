import { UserProps } from "../interfaces";
import { prisma } from "../prisma";

export class DeleteUser {
  async delete(data: string) {
    console.log(data);
    const user: UserProps = await prisma.client.delete({
      where: {
        id: data,
      },
    });
    return user;
  }
}
