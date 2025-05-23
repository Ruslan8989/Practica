const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "tample")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "tample", "ROT13.html"));
});

app.get("/style", (req, res) => {
  const cssPath = path.join(__dirname, "tample", "styles.css");
  res.header("Content-Type", "text/css");
  res.header("Content-Disposition", "inline");
  res.sendFile(cssPath);
});

app.get("/script", (req, res) => {
  const jsPath = path.join(__dirname, "tample", "script.js");
  res.header("Content-Type", "text/javascript");
  res.header("Content-Disposition", "inline");
  res.sendFile(jsPath);
});

app.use((req, res, next) => {
  const imagePath = path.join(__dirname, "tample", "404.png");
  res.status(404).sendFile(imagePath, (err) => {
    if (err) {
      res.status(500).send("Ошибка: Файл 404.png не найден.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});