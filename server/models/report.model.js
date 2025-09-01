import mongoose  from "mongoose";


const reportSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true ,
    } ,
    title : {
        type : String ,
        default : "Report "
    } ,
    image : {
        type : String ,

    }
} , {timestamps : true})

const Report = mongoose.model("Report" , reportSchema)

export default Report
