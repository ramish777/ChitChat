const mongoose = require('mongoose');
const { Schema } = mongoose;

const msgSchema = new Schema({
   senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   }, 
   receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
   message:{
    type:String,
    required:true,
   }

  },{timestamp:true});
  
  const Messages = mongoose.model('Messages', msgSchema);
  
  module.exports = Messages;