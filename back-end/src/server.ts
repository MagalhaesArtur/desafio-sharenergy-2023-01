import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(7583, () =>
  console.log("server rodando na porta 4444" + process.env.PORT)
);
