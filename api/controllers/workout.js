const Workout = require("../models/workout");

const handleError = (error, res) => {
  console.error("Error:", error);
  return res.status(500).send("Something went wrong. Please try again");
};

const create = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Please fill in all required fields." });
  }

  try {
    const workout = await Workout.create({
      title: req.body.title,
      load: req.body.load,
      reps: req.body.reps,
    });
    return res.status(200).json(workout);
  } catch (error) {
    console.info("400 at POST /workout", error);
    return res.status(400).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ workouts });
  } catch (error) {
    console.log("Find error", error);
    return res.status(400).json({ error: error.message });
  }
};

const findById = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .send({ message: "Workout not found with id" + req.params.id });
  }

  try {
    const workout = await Workout.findById(req.params.id);
    return res.status(200).json(workout);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .send({ message: "Error getting workout with id " + req.params.id });
    }
    return handleError(error, res);
  }
};

const deleteById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Workout not found with id" });
  }

  try {
    await Workout.findByIdAndRemove(req.params.id);
    res.send({ message: "Workout deleted successfully " });
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res
        .status(404)
        .json({ message: "Workout not found with id " + req.params.id });
    }
    return handleError(error, res);
  }
};

const updateById = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        reps: req.body.reps,
        load: req.body.load,
      },
      { new: true }
    );
    if (!workout) {
      return res
        .status(404)
        .json({ message: "Workout not found with id " + req.params.id });
    }
    res.send(workout);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .ststus(404)
        .json({ message: "Workout not found with id " + req.params.id });
    }

    return res
      .status(500)
      .json({ message: "Error updating workout with id " + req.params.id });
  }
};

module.exports = {
  create,
  findAll,
  findById,
  deleteById,
  updateById,
};
