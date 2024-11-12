import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "contact-me.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App running on port 3000");
});