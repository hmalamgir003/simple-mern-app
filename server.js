const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const itemsRoutes = require("./routes/api/items");

//db config
const db = require("./config/keys").mongoURI;
//connect database
mongoose.connect(db, { useNewUrlParser: true }, () =>
  console.log("Connect to DB...")
);

//middleware
app.use(express.json());

//routes middleware
app.use("/api/items", itemsRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
