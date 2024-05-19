const router = require('express').Router();
const Convo = require('../models/conversation');
const Users = require('../models/user');
const Message = require('../models/messages'); // Use the correct model name
const protectRouter = require('../middleware/TokenChecker');

//getAllMessage
router.route('/').get(protectRouter,async (req, res) => {
    const LoggedUserId = req.user._id;
    
    try {
        const users = await Users.find({ _id: { $ne: LoggedUserId } }).select("-password");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;    