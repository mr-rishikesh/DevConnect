import User from "../models/user.model.js";

export const updateExperiance = async (req, res) => {
  // "/users/:userId/experience/:expId"
  const { userId, expId } = req.params
  const updatedData = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ message: "user is not exists" });
    }

    const exp = user.experience.id(expId);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    Object.assign(exp, updatedData);
    await user.save();
    res.status(200).json({
      message: "Sucessfully Experiance Updated",
      data: exp,
    });
  } catch (error) {
    console.log("Error in update Experiance" + error.message);
    res.status(500).json({
      message: "Internal server error in the update experiance", err: error.message,
    });
  }
};

export const addExperiance = async (req, res) => {
  const { userId } = req.params;
  const experienceData = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.experience.push(experienceData);
    await user.save();
    res.status(201).json({ message: "Sucessfully added" });
  } catch (err) {

  }
};
// GET /users/:userId/experience

export const getExperiance = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(201).json({ message: "Sucessfully fetched", data: user.experience });
  } catch (err) {
    res.status(500).send(err.message);

  }
};


// DELETE /users/:userId/experience/:expId
export const deleteExperiance = async (req, res) => {
  const { userId, expId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "user is not exists" });
    }

    const exp = user.experience.id(expId);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    exp.remove(); // remove from subdocument array
    await user.save();
    res.send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
