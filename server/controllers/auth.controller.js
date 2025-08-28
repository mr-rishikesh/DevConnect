import User from "../models/user.model.js";
import { generateToken } from "../utils/util.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { email, fullName, githubUrl, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already exists , Try to login",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      githubUrl,
      fullName,
      email,

      password: hashedPassword,

    });
    await newUser.save();

    // todo: Needs to implement logic of sending otp

    if (newUser) {
      console.log(newUser)
      const token = generateToken(newUser._id, res);
      console.log("This is token" + token)


      // remove unnecessary data from response
      newUser.password = undefined;
      newUser._id = undefined;
      newUser.__v = undefined;
      newUser.createdAt = undefined;
      newUser.updatedAt = undefined;

      return res
        .status(201)
        .json({
          message: "Successfully Otp sent",
          data: newUser,
          token,
        });

    }

  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Failed to send OTP.", error: error });
  }
};



export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: "Put all credentals  "
    })
  }

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials  ,User not exists "
      })

    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        message: "Invalid credentials"
      })
    }

    const token = await generateToken(user._id, res)
    console.log("This is token" + token)

    return res.status(200).json({
      message: "Successfully logined ",
      data: user,
      token
    })

  } catch (error) {

    res.status(500).json({ success: false, message: "Something wrong in signup" })

  }
}

export const checkAuth = async (req, res) => {
  try {


    const allUsers = await User.find();

    res.status(200).json({ authUser: req.user, allUsers: allUsers });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something wrong in checkAuth"
    })

  }
}
