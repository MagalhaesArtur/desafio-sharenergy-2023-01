import express, { json } from "express";
import { UserController } from "./controllers/UserController";
import { UserProps } from "./interfaces";
import { AttUser } from "./services/AttUser";
import { CreateUser } from "./services/CreateUser";
import { DeleteUser } from "./services/DeleteUser";
import { GetUsers } from "./services/GetUsers";
import { authMiddleware } from "./middlewares/authMiddleware";

export const routes = express.Router();

routes.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = req.body;
    const data = await new UserController().Login(user);
    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
routes.use(authMiddleware);

routes.post("/createUser", async (req, res) => {
  try {
    const { address, cpf, email, name, number }: UserProps =
      req.body.data.client;
    const data = {
      address,
      cpf,
      email,
      name,
      number,
    };

    const user = new CreateUser();
    const newUser: UserProps = await user.create(data);

    return res.json(newUser).status(201).send();
  } catch (err) {
    return res.status(400).json({ erro: err });
  }
});

routes.post("/attUser", async (req, res) => {
  const { address, cpf, email, id, name, number }: UserProps =
    req.body.data.client;
  const data = {
    address,
    cpf,
    email,
    id,
    name,
    number,
  };
  const user = new AttUser();
  const upUser: any = await user.update(data);

  return res.json(upUser).status(201).send();
});

routes.delete("/deleteUser", async (req, res) => {
  const userId: any = await req.body;
  const deltedUser = await new DeleteUser().delete(userId.userId);

  return res.json(deltedUser).status(201);
});

routes.get("/getUsers", async (req, res) => {
  const users = await new GetUsers().get();
  return res.json(users).status(201);
});
