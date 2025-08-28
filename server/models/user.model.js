import mongoose from "mongoose";


const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },

    companey: {
        type: String,

    },
    endDate: Date
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "Developer"
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/1200x/97/17/1b/97171bd3726ad80a25d7ce7d5028db87.jpg"
    },
    portfolio: {
        type: String,
        default: ""
    },
    resume: {
        type: String,
        default: ""
    },
    techStack: {
        type: [String],
        default: ["full stack", "developer", "frontend"]
    },
    experience: { type: [experienceSchema], default: [] }


}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User