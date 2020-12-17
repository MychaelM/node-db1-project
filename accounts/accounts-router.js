const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

router.use("/", async (req, res, next) => {
  try {
    // SELECT * FROM accounts
    const accounts = await db.select('*').from('accounts');
    res.json(accounts);
  } catch(err) {
    next(err);
  }
})

module.exports = router;