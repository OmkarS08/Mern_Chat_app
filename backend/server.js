const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/useRoutes");
const chatRoutes = require("./routes/chatRoutes")
const {notFound ,errorHandler} = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()) // to accept json data

app.get("/",(req,res) =>{
    res.send("API is running Successfully");
});

app.use('/api/user',userRoutes); // api endpoint
app.use('/api/chat',chatRoutes); 

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT,console.log(`Server has Started on port ${PORT}`));