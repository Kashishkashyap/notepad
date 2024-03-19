const mongoose = require('mongoose');
const MONGOURI = 'mongodb+srv://kashyapkashish22:Jjt3GKtyXJvlh0l5@notepad.yh3s7cj.mongodb.net/';

const connectMongo = () => {
    mongoose.connect(MONGOURI, () => {
        console.log("DB connected");
    })
}
module.exports = connectMongo;