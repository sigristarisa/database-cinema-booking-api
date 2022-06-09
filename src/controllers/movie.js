const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const id = Number(req.params.id);
  const createdMovies = await prisma.movie.findMany({
    where: {
      id: id,
    },
    include: {
      screenings: true,
    },
  });

  res.json({ movies: createdMovies });
};

const addMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });

  res.json({ data: createdMovie });
};

module.exports = {
  getMovies,
  addMovie,
};
