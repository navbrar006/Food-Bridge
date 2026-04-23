const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({

food_type:Number,

quantity:Number,

location:{
lat:Number,
lng:Number
},

cooked_time:String,

predicted_shelf_life:Number,

risk_level:String,

assigned_ngo:{
type:mongoose.Schema.Types.ObjectId,
ref:"NGO"
},

status:{
type:String,
enum:["pending","accepted","rejected"],
default:"pending"
}

},{
timestamps:true
});

module.exports =
mongoose.model("Donation",donationSchema);