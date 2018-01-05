const port = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const app = express();

const public = path.join(__dirname, "..", "public");
app.use(express.static(public));

app.get("*", (req, res) => {
  res.sendFile(path.join(public, "index.html"));
});

app.listen(port, () => {
  console.log("server is up.....");
});
