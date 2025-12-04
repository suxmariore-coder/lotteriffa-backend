import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  const { address } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO users (address) VALUES ($1) RETURNING *",
      [address]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database insert error" });
  }
});

export default router;
