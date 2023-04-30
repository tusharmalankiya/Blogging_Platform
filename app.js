const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

//imports from files
const commonRoutes = require("./routes/commonRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { auth } = require("./middlewares/authMiddleware");
//----------------------------------------------------

require("dotenv").config();
app = express();

//***********************middlwares********************** */
app.use(morgan('dev'));
app.use(express.json());
app.use("/assets", express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());

//routes
app.use("/", commonRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", auth, authRoutes);
app.get("*", (req, res)=>{
  res.status(404).render('404');
})
//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to database and listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
