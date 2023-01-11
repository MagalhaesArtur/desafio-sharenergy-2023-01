import { prisma } from "../prisma";

export class GetUsers {
  async get() {
    let users: any = await prisma.client.findMany();

    return users;
  }
}
