const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

app.post("/create", async (req, res, next) => {
  try {
    await prisma.product.create({
      data: req.body,
    });
    res.send({ message: "success" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
app.get("/list", async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.send({ results: data });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
app.delete("/remove/:id", async (req, res) => {
  try {
    await prisma.product.update({
      data: {
        status: "delete",
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
app.put("/update", async (req, res) => {
  try {
  } catch (e) {}
});

module.exports = app;
