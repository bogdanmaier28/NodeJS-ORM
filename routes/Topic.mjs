import express from "express";
import { PrismaClient } from "@prisma/client";

const TopicRoute = express.Router();

TopicRoute.post("/", async (req, res) => {
  const prisma = new PrismaClient();

  const { name } = req.body;

  try {
    const createdTopic = await prisma.topic.create({
      data: {
        name: name,
      },
    });

    res.status(201).send(createdTopic);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

TopicRoute.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const allTopics = await prisma.topic.findMany();

    res.status(200).send(allTopics);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

TopicRoute.get("/:topic_id", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const topic_id = Number(req.params.topic_id);

    const topic = await prisma.topic.findUnique({
      where: { id: topic_id },
    });

    res.status(200).send(topic);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

TopicRoute.put("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const { id, name } = req.body;

    const updatedTopic = await prisma.topic.update({
      where: { id: id },
      data: { name: name },
    });

    res.status(200).send(updatedTopic);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

TopicRoute.delete("/:topic_id", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const topic_id = Number(req.params.topic_id);

    const deletedTopic = await prisma.topic.delete({
      where: { id: topic_id },
    });

    res.status(200).send(deletedTopic);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default TopicRoute;
