const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    user_name:{
        require:true,
        type:String
    },
    email:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }
})

const userModel=mongoose.model("userModel",userSchema)
module.exports= userModel