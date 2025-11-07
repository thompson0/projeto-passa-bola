import express from "express";
import authRoutes from "./authRoutes.js";
import teamRoutes from './teamRoutes.js';
import playerRoutes from './playerRoutes.js'


const routes = (app) => {
  app.use(express.json());
  // Definindo uma mensagem na rota padrão
  app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the Teams and Players API" });
  });
  // Usando as rotas de autenticação, time e jogadoras
  app.use(authRoutes);
  app.use(teamRoutes);
  app.use(playerRoutes);
};

export default routes;