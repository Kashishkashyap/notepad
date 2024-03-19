const express = require('express');
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const mongoose = require('mongoose');
var cors= require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://kashyapkashish22:Jjt3GKtyXJvlh0l5@notepad.yh3s7cj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DataBase Connected");
});





app.use('/v1/api/auth', auth);
app.use('/v1/api/notes', notes);


// react will run on port 3000
app.listen(5000, () => {
    console.log("Listening on port 3000");
})