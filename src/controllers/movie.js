const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const requestQuery = req.query;

  // FILTERING MOVIES ACCORDING TO RUNTIME
  if (Object.keys(requestQuery).length > 0) {
    const maxRuntime = Number(requestQuery.runtimeMins.lte);
    const minRuntime = Number(requestQuery.runtimeMins.gte);
    const filteredMovies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          lte: maxRuntime,
          gte: minRuntime,
        },
      },
    });
    res.json({ data: filteredMovies });
  } else {
    const createdMovies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });

    res.json({ movies: createdMovies });
  }
};

const getMovie = async (req, res) => {
  const id = Number(req.params.id);
  const createdMovies = await prisma.movie.findUnique({
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
  const { title, runtimeMins, screenings } = req.body;
  console.log("what's in body: ", req.body);

  if (screenings) {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
        screenings: {
          create: [screenings],
        },
      },
      include: {
        screenings: true,
      },
    });
    res.json({ data: createdMovie });
  } else {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });
    res.json({ data: createdMovie });
  }
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
};
