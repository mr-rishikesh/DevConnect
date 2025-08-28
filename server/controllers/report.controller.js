import cloudinary from "../utils/cloudinary.js";
import Report from "../models/report.model.js";



export const uploadReportController = async (req, res) => {
    const user = req.user;
    const userId = user._id;
    const { image, title } = req.body;

    try {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        imageUrl = uploadResponse.secure_url

        const report = new Report({
            userId,
            title,
            image: imageUrl
        })

        await report.save();


        //const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uploadResponse.secure_url} , {new : true})
        // console.log("before the res in update profile")
        res.status(200).json({
            message: "Successfully report added",
            data: report
        })
    } catch (error) {

    }
}
export const getReports = async (req, res) => {
    const user = req.user;
    const userIdNew = user._id;
    try {

        const reports = await Report.find({ userId: userIdNew });

        if (!reports) {
            return res.status(200).json({
                message: "No Reports found for this user",

            })
        }
        return res.status(200).json({
            message: "Successfully Reports found for this user",
            data: reports

        })

    } catch (error) {
        return res.status(200).json({
            message: "Something wrong",


        })
    }

}