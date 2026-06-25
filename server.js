require("dotenv").config();

const express =
  require("express");

const mongoose =
  require("mongoose");

const path =
  require("path");

const weatherRoutes =
  require("./routes/weatherRoutes");

const app = express();

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

app.use(
  "/weather",
  weatherRoutes
);

mongoose.connect(
  process.env.MONGODB_URI
)
.then(() => {
  console.log(
    "MongoDB Connected"
  );
})
.catch((err) => {
  console.error(err);
});

app.listen(3000, () => {
  console.log(
    "Server running on port 3000"
  );
});