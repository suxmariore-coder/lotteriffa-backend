import express from "express";
import pool from "./db.js";

const router = express.Router();

/* GET LISTA UTENTI */
router.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Errore GET /users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* REGISTRAZIONE UTENTE */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e password richiesti" });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Errore POST /register:", err);
    res.status(500).json({ error: "Database insert error" });
  }
});

export default router;
