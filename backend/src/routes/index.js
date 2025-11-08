import express from "express";
import authRoutes from "./authRoutes.js";
import teamRoutes from './teamRoutes.js';
import playerRoutes from './playerRoutes.js';
import userRoutes from './userRoutes.js';  // Nova importação

const routes = (app) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the Teams and Players API" });
  });
  app.use(authRoutes);
  app.use(teamRoutes);
  app.use(playerRoutes);
  app.use(userRoutes);  // Novas rotas
};

export default routes;