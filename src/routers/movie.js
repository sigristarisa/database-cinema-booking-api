const express = require("express");
const router = express.Router();
const prisma = require("../utils/prisma");

router.get("/", async (req, res) => {
  let query = "SELECT * FROM 'prisma'.'Movie' LIMIT 100";

  const createdMovies = await prisma.movie.findMany();
  res.json({ movies: createdMovies });
});

module.exports = router;
