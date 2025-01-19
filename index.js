require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const controller = require("./controller");

const app = express();
const ROOT_DIR = process.env.ROOT_DIR || __dirname;

nunjucks.configure(path.resolve(ROOT_DIR, "view"), {
	express: app,
	autoscape: true,
	noCache: true, // Use true for development to disable caching
});
app.use(express.static(path.resolve(ROOT_DIR, "public")));
app.use(morgan("dev"));
app.use(
	cors({
		origin: ["http://localhost:3000", "http://192.168.1.3:3000"],
		credentials: true,
	})
);

app.get("/", controller.HOME);
app.use("/api/v1/ph/regions", controller.REGIONS);
app.use("/api/v1/ph/provinces", controller.PROVINCES);
app.use("/api/v1/ph/citymuns", controller.CITYMUNS);
app.use("/api/v1/ph/barangays", controller.BARANGAYS);

app.listen(process.env.PORT, process.env.ADDR, () => {
	console.log("Server is running on " + process.env.ADDR + ":" + process.env.PORT);
});
