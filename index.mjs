import express from "express";
import dotenv from "dotenv";
import StatusRoute from "./routes/Status.mjs";
import TopicRoute from "./routes/Topic.mjs";
import TodoRoute from "./routes/Todo.mjs";

const server = () => {
  dotenv.config();
  const port = process.env.PORT;

  const app = express();

  app.use(express.json());

  app.use("/status", StatusRoute);
  app.use("/topic", TopicRoute);
  app.use("/todo", TodoRoute);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

server();
