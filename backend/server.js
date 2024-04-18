const express= require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(express.json()); //for getting data from req.body

const uri = "mongodb+srv://ramish881:dXuDuObvhppR6bDd@cluster0.cj28cmq.mongodb.net/ChitChat?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const authRoutes= require('./routes/authRoutes');
//creating middlewares routes
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});