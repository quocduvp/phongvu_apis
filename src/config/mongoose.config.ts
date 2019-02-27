import mongoose from 'mongoose'

mongoose.connect("mongodb://admin_portal:admin123@ds151805.mlab.com:51805/phongvu_dbs")
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongodb connected")
});

export {mongoose}