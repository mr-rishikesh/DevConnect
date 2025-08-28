
import express from "express"
import { addExperiance, deleteExperiance, getExperiance, updateExperiance } from "../controllers/updateProfile.controller.js";

import { follow, getFollowersAndFollowee, unfollow } from "../controllers/follows.controller.js";

const updateProfileRoute = express.Router();

updateProfileRoute.post("/:userId/experience/:expId" , updateExperiance);
updateProfileRoute.get("/:userId/experience" , getExperiance);
updateProfileRoute.delete("/:userId/experience/:expId" , deleteExperiance);
updateProfileRoute.post("/:userId/experience" , addExperiance);

updateProfileRoute.post("/follow/:followerId/:followeeId" , follow)
updateProfileRoute.post("/unfollow/:followerId/:followeeId" , unfollow)
updateProfileRoute.post("/followlist/:myId" , getFollowersAndFollowee)

export default updateProfileRoute