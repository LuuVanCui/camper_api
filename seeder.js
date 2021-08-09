const fs = require("fs");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

dotenv.config({ path: "./config/config.env" });

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Bootcamps Imported...".green.inverse);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Bootcamps Destroyed...".red.inverse);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
