const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/v1/ping", (req, res) => {
  res.json({ message: "ok" });
});

app.use(express.static(path.join(__dirname, "static")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "static", "components.html"));
});

const PORT = "62544";
async function start() {
  app.listen(PORT, () => {
    console.log(`
-------------------------------
Server on: ${PORT}
http://localhost:${PORT}/
http://localhost:${PORT}/auth.html
figma:
https://www.figma.com/file/e6CPWViwJTFCZxUp18VT1u/AI-constructor?node-id=255%3A270
-------------------------------
`);
  });
}
start();
