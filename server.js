const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const SocketServer = require('./socketServer');
const {ExpressPeerServer} = require('peer');
const path = require('path');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  SocketServer(socket);
});

ExpressPeerServer(http, {path: '/'});

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(cookieParser());

app.use('/api', require('./routes/auth.route'));
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/post.route'));
app.use('/api', require('./routes/comment.route'));
app.use('/api', require('./routes/notification.route'));
app.use('/api', require('./routes/message.route'));

dotenv.config({
  path: './config/.env'
});

connectDB();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
}

http.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));