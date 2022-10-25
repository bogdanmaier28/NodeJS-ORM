import express from "express";
import { PrismaClient } from "@prisma/client";

const TodoRoute = express.Router();

TodoRoute.post("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const { title, description, status_id } = req.body;

    const createdTodo = await prisma.todo.create({
      data: {
        title,
        description,
        status_id,
      },
    });

    res.status(201).send(createdTodo);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

TodoRoute.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const order = req.query.order || "asc";

    const allTodos = await prisma.todo.findMany({
      include: {
        status: true,
        topics: true,
      },
      orderBy: {
        created_at: order,
      },
    });

    res.status(200).send(allTodos);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

TodoRoute.get("/search", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const order = req.query.order || "asc";
    const { include } = req.body;

    const allTodos = await prisma.todo.findMany({
      where: {
        OR: [
          { title: { search: include } },
          { description: { search: include } },
        ],
      },
      include: {
        status: true,
        topics: true,
      },
      orderBy: {
        created_at: order,
      },
    });

    res.status(200).send(allTodos);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

TodoRoute.get("/:todo_id", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const todo_id = Number(req.params.todo_id);

    const todo = await prisma.todo.findUnique({
      where: {
        id: todo_id,
      },
      include: {
        status: true,
        topics: true,
      },
    });

    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

TodoRoute.put("/assign_topic", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const { topic_id, todo_id } = req.body;

    // First find the topic that we want to asing
    const topic = await prisma.topic.findUnique({
      where: { id: topic_id },
    });

    // Then connect it to the todo
    const todo = await prisma.todo.update({
      where: { id: todo_id },
      data: {
        topics: {
          connect: { id: topic.id },
        },
      },
      include: {
        status: true,
        topics: true,
      },
    });

    res.status(200).send(todo);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

TodoRoute.put("/", async (req, res, next) => {
  const prisma = new PrismaClient();

  try {
    const { id, title, description, status_id } = req.body;

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        status_id: status_id,
      },
      include: {
        status: true,
        topics: true,
      },
    });

    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default TodoRoute;
