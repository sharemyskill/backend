import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
// "mongodb+srv://devs:devs@shareskillcluster.wqyvd.mongodb.net/test?retryWrites=true&w=majority" 

// mongoose.connect( process.env.MONGODB_URI,
//     { 
//          useNewUrlParser: true , 
//          useUnifiedTopology: true 

//     } ).then(() => {
//     console.log('You are connected to the database.');
// }).catch(err => {
//     console.log(err.message);
//     process.exit();
// });

export { mongoose } ;