const mongoose = require('mongoose');
const { Schema } = mongoose;

const convoSchema = new Schema({
   participant:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
   ],
   Message:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Messages",
        required:true,
        default:[],
    }
   ]
  },{timestamp:true});
  
  const Conversations = mongoose.model('Conversations', convoSchema);
  
  module.exports = Conversations;