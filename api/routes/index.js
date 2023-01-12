const { Router } = require("express");
const workoutController = require("../controllers/workout")
const router = Router();

// workout routes
router.get("/api/workouts", workoutController.findAll);
router.post("/api/workout", workoutController.create);
router.get("/api/workout/:id", workoutController.findById);
router.delete("/api/workout/:id", workoutController.deleteById);

module.exports = router;
