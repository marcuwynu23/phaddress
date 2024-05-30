require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const controller = require("./controller");

const app = express();

nunjucks.configure(path.resolve(__dirname, "view"), {
  express: app,
  autoscape: true,
  noCache: false,
	watch:true
});
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cors());

app.get("/", controller.HOME);
app.use("/api/v1/ph/regions", controller.REGIONS);
app.use("/api/v1/ph/provinces", controller.PROVINCES);
app.use("/api/v1/ph/citymuns", controller.CITYMUNS);
app.use("/api/v1/ph/barangays", controller.BARANGAYS);

app.listen(process.env.PORT, process.env.ADDR, () => {
  console.log(
    "Server is running on " + process.env.ADDR + ":" + process.env.PORT
  );
});
