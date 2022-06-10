const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const requestQuery = req.query;
  let createdMovies;

  // FILTERING MOVIES ACCORDING TO RUNTIME
  if (Object.keys(requestQuery).length > 0) {
    const maxRuntime = Number(requestQuery.runtimeMins.lte);
    const minRuntime = Number(requestQuery.runtimeMins.gte);
    createdMovies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          lte: maxRuntime,
          gte: minRuntime,
        },
      },
    });
  } else {
    createdMovies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
  }
  res.json({ movies: createdMovies });
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
  let createdMovie;
  const dupMovie = await prisma.movie.findFirst({
    where: {
      title,
    },
  });

  if (dupMovie)
    return res
      .status(404)
      .json({ status: "fail", message: "This movie already exists" });

  if (screenings) {
    createdMovie = await prisma.movie.create({
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
  } else {
    createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });
  }
  res.json({ data: createdMovie });
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
};
