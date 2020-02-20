if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//App variables
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;

//Routes
const indexRouter = require("./routes/index");
const projectRouter = require("./routes/projects");
const skillRouter = require("./routes/skills");
const costumerRouter = require("./routes/costumers");
const gitRouter = require("./routes/git");
const contactRouter = require("./routes/contact");

//App setting and usage
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
//Data base connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.on("error", (error) => {
  console.log("Error on connect to Database, error: " + error);
});
db.once("open", () => {
  console.log("connected to mongoose");
});

//App Routes usage call
app.use("/", indexRouter);
app.use("/projects", projectRouter);
app.use("/skills", skillRouter);
app.use("/costumers", costumerRouter);
app.use("/git", gitRouter);
app.use("/contacts", contactRouter);
app.listen(process.env.PORT || 3000);
