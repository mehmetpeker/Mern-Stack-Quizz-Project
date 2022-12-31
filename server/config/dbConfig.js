const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', ()=> {
    console.log("Veritabanına başarıyla bağlanıldı");
})

connection.on('error', (err) => {
    console.log("Veritabanına bağlanırken bir hata oluştu!");
})

module.exports = connection;