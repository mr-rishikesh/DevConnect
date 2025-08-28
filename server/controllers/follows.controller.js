import Follows from "../models/follows.model.js";
import User from "../models/user.model.js";

export const follow = async (req, res) => {
  const { followerId, followeeId } = req.params;

  try {
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);

    if (!(followee || follower)) {
      res.status(400).json({
        message: "Either follower or Followee do not exists",
        followeeId,
        followerId
      });
    }
    const followed = await Follows.findOne({ followerId, followeeId });

    if (followed) {
      res.status(400).json({
        message: "Alredy followed",
      });
    }
    const follows = new Follows({
      followerId,
      followeeId,
    });

    await follows.save();

    if (!follows) {
      res.status(400).json({
        message: "Something Error try again later",
      });
    }

    res.status(201).json({
      message: "Sucessfully Followed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error ",
      error,
      err: error.message,
    });
  }
};


export const unfollow = async (req, res) => {
  const { followerId, followeeId } = req.params;

  try {
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);


    if (!(followee || follower)) {
      res.status(400).json({
        message: "Either follower or Followee do not exists",
      });
    }

    const sucess = await Follows.deleteOne({ followerId, followeeId })


    if (!sucess) {
      res.status(400).json({
        message: "Something Error try again later",
      });
    }

    res.status(201).json({
      message: "Sucessfully Unfollowed",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error ",
      error,
      err: error.message,
    });
  }
}

export const getFollowersAndFollowee = async (req, res) => {
  const { myId } = req.params;

  try {

    const following = await Follows.find({ followerId: myId });
    const followers = await Follows.find({ followeeId: myId });

    const followerIds = followers.map(f => f.followerId);
    const followingIds = following.map(f => f.followeeId);

    const followersUsers = await User.find({ _id: { $in: followerIds } })
    const followingUsers = await User.find({ _id: { $in: followingIds } })

    res.status(201).json({
      message: "sucess",
      followers: followersUsers,
      following: followingUsers
    })

  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error ",
      error,
      err: error.message,
    });

  }
}