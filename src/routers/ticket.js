const express = require("express");
const { addTicket } = require("../controllers/ticket");

const router = express.Router();

router.post("/", addTicket);

module.exports = router;
