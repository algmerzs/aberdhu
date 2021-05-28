"use strict";

const express = require("express");
const path = require("path");

const server = express();

// Services
server.set("port", 8000);
server.set("pages", path.join(__dirname, "pages"));
// Rutas

// Página principal
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname.concat("/pages/index.html")));
});

// Inicio sesión
server.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname.concat("/pages/login.html")));
});

// Indices economicos
server.get("/indices", (req, res) => {
  res.sendFile(path.join(__dirname.concat("/pages/indices.html")));
});

// Noticias
server.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname.concat("/pages/news.html")));
});

// Búsqueda
server.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname.concat("/pages/search.html")));
});

server.listen(server.get("port"), () => {
  console.log(`Listening in port ${server.get("port")}`);
});
