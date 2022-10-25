import express from "express";
import { PrismaClient } from "@prisma/client";

const StatusRoute = express.Router();

StatusRoute.post("/", async (req, res) => {
  const prisma = new PrismaClient();

  const { name } = req.body;

  try {
    const createdStatus = await prisma.status.create({
      data: {
        name: name,
      },
    });

    res.status(201).send(createdStatus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

StatusRoute.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const allStatuses = await prisma.status.findMany();

    res.status(200).send(allStatuses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

StatusRoute.get("/:status_id", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const status_id = Number(req.params.status_id);

    const status = await prisma.status.findUnique({
      where: { id: status_id },
    });

    res.status(200).send(status);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

StatusRoute.put("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const { id, name } = req.body;

    const updatedStatus = await prisma.status.update({
      where: { id: id },
      data: { name: name },
    });

    res.status(200).send(updatedStatus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

StatusRoute.delete("/:status_id", async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const status_id = Number(req.params.status_id);

    const deletedStatus = await prisma.status.delete({
      where: { id: status_id },
    });

    res.status(200).send(deletedStatus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default StatusRoute;
