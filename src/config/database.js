// const {mongoose} = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => {
//         console.log('database connect sucessfully');
//     })
//     .catch(error => {
//         console.log('It has been an error connected to the database', error);
//     })

// app.listen (process.env.PORT , ()=>{
//     console.log ('App is running on port' , process.env.PORT);
// })


// module.exports = db;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    process.exit(1); // stop app if DB connection fails
  }
};

module.exports = connectDB;
