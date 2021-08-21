const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamp");

const Bootcamp = require("../models/Bootcamp");

// Include other resources routers
const courseRoute = require("./courses");
const reviewRoute = require("./reviews");

const router = express.Router();

const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRoute);
router.use("/:bootcampId/reviews", reviewRoute);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
