const prisma = require("../utils/prisma");

// const getMovie = async (req, res) => {
//   const createdMovies = await prisma.movie.findMany({
//     include: {
//       screenings: true,
//     },
//   });

//   res.json({ movies: createdMovies });
// };

const getMovies = async (req, res) => {
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
  const { title, runtimeMins } = req.body;
  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });

  res.json({ data: createdMovie });
};

const filterMovie = async (req, res) => {
  const requestQuery = req.query;

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

module.exports = {
  // getMovie,
  getMovies,
  addMovie,
  filterMovie,
};
