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
  let identifier = req.params.id;
  const whereData = {};

  if (identifier == Number(identifier)) {
    whereData.id = Number(identifier);
  } else {
    whereData.title = identifier;
  }

  const createdMovies = await prisma.movie.findMany({
    where: {
      OR: [whereData],
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
      .status(400)
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

const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins, screenings } = req.body;

  const updatedMovie = await prisma.movie.update({
    where: {
      id: movieId,
    },
    data: {
      title,
      runtimeMins,
      screenings: {
        update: screenings.map((screening) => {
          return {
            where: {
              id: screening.id,
            },
            data: {
              screenId: screening.screenId,
              startsAt: screening.startsAt,
            },
          };
        }),
      },
    },
  });

  res.json({ data: updatedMovie });
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
};
