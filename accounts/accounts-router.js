const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // SELECT * FROM accounts
    const accounts = await db.select('*').from('accounts');
    res.json(accounts);
  } catch(err) {
    next(err);
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    // SELECT * FROM accounts WHERE id = ?
    const account = await db("accounts").first().where("id", req.params.id);
    res.json(account);
  } catch(err) {
    next(err);
  }
})

router.post("/", async (req, res, next) => {
  try {
    // INSERT INTO accounts (name, budget) VALUES (?, ?)
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    const [id] = await db.insert(payload).into("accounts");
    const account = await db("accounts").first().where("id", id)
    res.status(201).json(account);
  } catch(err) {
    next(err);
  }
})

module.exports = router;