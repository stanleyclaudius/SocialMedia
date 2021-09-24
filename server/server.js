const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const SocketServer = require('./socketServer');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  SocketServer(socket);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', require('./routes/auth.route'));
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/post.route'));
app.use('/api', require('./routes/comment.route'));

dotenv.config({
  path: './config/.env'
});

connectDB();
http.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));