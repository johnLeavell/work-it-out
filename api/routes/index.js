const { Router } = require("express");
const workoutController = require("../controllers/workout");
const userController = require("../controllers/user");
const requireAuth = require('../middleware/requireAuth')

const router = Router();

// workout routes
router.get("/api/workouts", workoutController.findAll);
router.post("/api/workout", workoutController.create);
router.get("/api/workout/:id", workoutController.findById);
router.delete("/api/workout/:id", workoutController.deleteById);

// auth for all workout 
router.use(requireAuth)
// user routes
router.post("/api/login", userController.loginUser);
router.post("/api/signup", userController.signupUser);


module.exports = router;
