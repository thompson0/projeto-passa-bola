import express from "express";
import authRoutes from "./authRoutes.js";
import teamRoutes from "./teamRoutes.js";
import playerRoutes from "./playerRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = (app) => {
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
  });

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the Teams and Players API" });
  });

  app.use(authRoutes);
  app.use(teamRoutes);
  app.use(playerRoutes);
  app.use(userRoutes);
};

export default routes;
