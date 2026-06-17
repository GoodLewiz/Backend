import { model, Schema } from "mongoose";

const userSchema = new Schema({

name : {
    type: String,
    required : true,
    trin : true
},
email: {
    type: String,
    required : true,
    unique : true,
    trin : true
},
password:{
    type: String,
    required: true,
    select : false,
    minlength : 6
},

role :{
    type :String,
    enum : ['admin' , 'user'],
    default : 'user'
},
status : {
        type : Boolean,
        default : true
    }


},{
    versionKey : false,
    timestamps : true
});


export default model('user', userSchema);