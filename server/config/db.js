const User = require('../models/users');
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/test';

module.exports = (mongoose) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .catch((error)=> console.error("Error connecting to DB: ", error));

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  return db;
}


// User.findOne({'username': 'batman'}, 'username', function(err,user){
//   if(err) return console.error(err);
//   if(user){
//     console.log(user);
//   } else {
//     User.hashPassword('test123', function(err, hash)  {
//       if (err) return console.error(err);

//       console.log(hash)

//       User.create({username: 'batman', password: hash}, function(err, user){
//         if(err) return console.error(err);
//         console.log("check password:",user.checkPassword('test123'));

//         console.log(user);
//       })
//     })
//   }
// })

// User.findOne({'username': 'batman'}, function(err, user){
//   user.checkPassword('test123')
//   .then((res) => console.log("password:", res))
//   .catch((err) => console.error(err));
// })