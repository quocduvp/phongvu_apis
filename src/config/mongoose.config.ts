import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL,{
  useCreateIndex: true,
  useNewUrlParser: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongodb connected")
});

export {mongoose}