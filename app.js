require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const subscribersRouter = require("./routes/subscribers");

// try {
//   mongoose.connect(
//     process.env.DATABASE_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => console.log("MongoDB is running!")
//   );
// } catch (error) {
//   console.log(error);
// }

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("MongoDB is running!")
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error)); // Here, we've defined what happens when the database encounters an error ...
db.once("open", () => console.log("Connected to the Database")); // ... if there is no error we log this

app.use(express.json()); // The ".use" is a middleware that allows us to run code when the server gets a request, but before it gets passed to our routes. So, in this instance we’re telling Express to accept JSON as the data format

app.use("/subscribers", subscribersRouter);

app.listen(3000, () =>
  console.log(
    "The YouTube RESTful API is listening of PORT http://127.0.0.1:3000"
  )
);
