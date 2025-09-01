import mongoose, { Mongoose } from "mongoose";


const FollowsSchema = mongoose.Schema({

     followerId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    },

        followeeId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    }

} ,{timestamps : true} )

const Follows = mongoose.model("Follows" , FollowsSchema)

export default Follows