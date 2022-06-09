const express = require("express");
const router = express.Router();
const { getMovie, getMovies, addMovie } = require("../controllers/movie");

router.get("/", getMovie);
router.get("/:id", getMovies);
router.post("/", addMovie);

module.exports = router;
