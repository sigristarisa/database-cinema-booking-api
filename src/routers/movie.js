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

module.exports = router;
