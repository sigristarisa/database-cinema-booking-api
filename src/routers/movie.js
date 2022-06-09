const express = require("express");
const router = express.Router();
const prisma = require("../utils/prisma");

router.get("/", async (req, res) => {
  const createdMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.json({ movies: createdMovies });
});

router.post("/", async (req, res) => {
  const { title, runtimeMins } = req.body;

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });

  res.json({ data: createdMovie });
});

module.exports = router;
