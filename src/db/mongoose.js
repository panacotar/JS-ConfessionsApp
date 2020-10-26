require("dotenv").config();
const mongoose = require("mongoose");

// Local DB
// mongoose.connect("mongodb://" + process.env.DB_HOST + "/confessionsUserDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Remote DB
mongoose.connect(
  "mongodb+srv://dario-admin:" +
    process.env.DB_PASS +
    "@cluster0-bhjc9.mongodb.net/confessionsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useCreateIndex", true);
