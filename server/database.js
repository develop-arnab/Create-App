
const mongoose = require('mongoose');

module.exports = () => {
    mongoose
      .connect(
        process.env.MONGO_CONNECT,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true
        }
      )
      .then(() => console.log("Connected to Mongodb......"));
}