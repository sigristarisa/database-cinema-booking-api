const express = require("express");
const router = express.Router();
const { getMovies, getMovie, addMovie } = require("../controllers/movie");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", addMovie);

module.exports = router;
