const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors= require('cors');

const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Specify the allowed origin
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(express.json()); //for getting data from req.body
app.use(cookieParser());

const uri = "mongodb+srv://ramish881:dXuDuObvhppR6bDd@cluster0.cj28cmq.mongodb.net/ChitChat?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const authRoutes = require('./routes/authRoutes');
const msgRoutes = require('./routes/msgRoutes');
const userRoutes = require('./routes/userRoutes');


//creating middlewares routes
app.use('/auth', authRoutes);
app.use('/msg', msgRoutes);
app.use('/users', userRoutes);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
