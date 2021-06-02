const { Router } = require("express");
const router = Router();
const news = require("../request.js");

const groups = require("../sample.json");
// console.log(groups);
// router.get("/", (req, res) => {});

router.get("/", (req, res) => {
  //   res.send(news);
  res.send("esta funcionando");
  console.log(news);
});

router.get("/groups", (req, res) => {
  res.json(groups);
});

router.post("/groups", (req, res) => {
  //   console.log(req.body);
  const newGroup = { ...req.body };
  //   console.log(newGroup);
  //   groups.push(newGroup);
  //   res.json(groups);
  res.send("received");
});

module.exports = router;
