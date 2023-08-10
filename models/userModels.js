const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Pleses add user name"],
    },
    email:{
        type:String,
        required:[true, "Pleses add the user email address"],
        unique:[true, "Email address alerdy taken"],
    },  
    password:{
        type:String,
        required:[true, "please add the user password"],
    }

},
{
    timestamps: true,
}
);

module.exports=mongoose.model("User", userSchema)