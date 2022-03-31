const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const produce = require('./producer');
const consume = require('./consumer');


const app = express();

app.options('*', cors()) // include before other routes
app.use(cors())

app.get("/", (req, res) => {
	return res.json({data: "Connected server" });
});

// try {  
//   const data = fs.readFileSync('logfile.txt', 'utf8');
//   console.log(data.toString());    
// } catch(e) {
//   console.log('Error:', e.stack);
// }


app.get("/ping", (req, res) => {
  return res.json({data: "pong" })
});


app.get("/health", (req, res) => {
        return res.json({status: `${process.env.APP_NAME} is running on port ${process.env.PORT}`, data: "Application healthy" });
});

// call the `produce` function and log an error if it occurs
// produce().catch((err) => {
// 	console.error("error in producer: ", err)
// })

// start the consumer, and log any errors
consume().catch((err) => {
	console.error("error in consumer: ", err)
})


app.listen(process.env.PORT || 3000);
console.log(`App listening on http://localhost:${process.env.PORT}`);
