const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatbot.controller.js");

router.post("/chat", sendMessage);

module.exports = router;
