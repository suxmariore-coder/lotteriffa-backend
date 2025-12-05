import express from "express";
import cors from "cors";
import users from "./src/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// prefisso API corretto
app.use("/api", users);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
