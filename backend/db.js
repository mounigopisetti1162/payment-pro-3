
const mongoose = require('mongoose')

const MONGO_URL=process.env.MONGO_URL
// MONGO_URL="mongodb://localhost:27017/payment"
// MONGO_URL="mongodb+srv://mounika1162:Lakshmisri1162@cluster0.osmdqyw.mongodb.net"
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database successfully connected");
    console.log(process.env.port)

})
//the link need to be chNGED