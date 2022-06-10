const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
} = require("../controllers/movie");

router.get("/", getMovies);
router.get("/search/:id", getMovie);
router.post("/", addMovie);
router.patch("/:id", updateMovie);

module.exports = router;
