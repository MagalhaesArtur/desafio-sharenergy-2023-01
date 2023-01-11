import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppErrors } from "../errors/AppErrors";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { authorization }: any = req.headers;
  if (req.body.headers) {
    var { Authorization } = req.body.headers;
  }

  let token = "";

  if (!authorization && !Authorization) {
    throw new AppErrors("Sem autorização", 401);
  }

  if (authorization) {
    token = authorization.split(" ")[1];
  } else {
    token = Authorization.split(" ")[1];
  }
  jwt.verify(token, process.env.JWT_PASS || "", async (err, decoded: any) => {
    if (err)
      return res.status(500).send({ auth: false, message: "Token inválido." });

    const user = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (user == null) {
      throw new AppErrors("Sem autorização", 401);
    }
    const { password, ...userAux } = user;
    req.userAux = userAux;
    next();
  });
};
