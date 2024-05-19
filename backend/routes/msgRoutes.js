const router = require('express').Router();
const Convo = require('../models/conversation');
const Message = require('../models/messages'); // Use the correct model name
const protectRouter = require('../middleware/TokenChecker');

router.route('/send/:id').post(protectRouter, async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Ensure req.user contains the user object and _id is the user's ID

    try {
        console.log('Sender ID:', senderId);
        console.log('Receiver ID:', receiverId);

        let conversation = await Convo.findOne({
            participant: { $all: [senderId, receiverId] },
        });

        console.log('Found Conversation:', conversation);

        if (!conversation) {
            console.log('Creating new conversation');
            conversation = new Convo({
                participant: [senderId, receiverId],
                Message: [] // Initialize the Message array if creating a new conversation
            });
            await conversation.save();
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        conversation.Message.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);
    } catch (err) {
        console.error('Error in sendMessage:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

//getAllMessage
router.route('/:id').get(protectRouter,async (req, res) => {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    
    try {
        let conversation = await Convo.findOne({
            participant: { $all: [senderId, receiverId] },
        }).populate("Message");

        if(!conversation) {res.status(200).json([]);}

        res.status(200).json(conversation.Message);
    
       
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
    
    });

module.exports = router;    