const mongoose= require("mongoose");
const {Schema}= require("mongoose");
const {isEmail}= require("validator");

const UserSchema=new Schema({
    firebase_id:{
        type:String,
        unique:true
    },
    active: {
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        default:"user",
    },
    username:{
        type:String,
        required:[true, "Please, give us your user name"]
    },
    email:{
        type:String,
        required:[true, "Please, give us your email"]
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    country:{
        type:String,
    },
    birthday:{
        type:Date,
    },
    mySongs:[{
        type: Schema.Types.ObjectId, 
        ref:"songs",
      }],
    
    favSongs:[{
        type: Schema.Types.ObjectId, 
        ref:"songs",
    }],
     
    myPlaylists:[{
        type: Schema.Types.ObjectId, 
        ref:"playlists",
    }],

    favPlaylists:[{
        type: Schema.Types.ObjectId, 
        ref:"playlists",
    }],
    lastSongs:[{
        type: Schema.Types.ObjectId, 
        ref:"songs",
    }],

    friends:[{
        type: Schema.Types.ObjectId, 
        ref:"users",
    }],
    
    // genres:[{
    //     type: Schema.Types.ObjectId, 
    //     ref:"songs",
    // }],

},{
    timestamps:true
})

const Users = mongoose.model("users",UserSchema)

module.exports=Users;