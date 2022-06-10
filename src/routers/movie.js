const express = require("express");
const router = express.Router();
const {
  getMovie,
  getMovies,
  addMovie,
  filterMovie,
} = require("../controllers/movie");

router.get("/", filterMovie);
router.get("/:id", getMovies);
router.post("/", addMovie);

module.exports = router;
