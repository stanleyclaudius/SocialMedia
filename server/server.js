const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', require('./routes/auth.route'));
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/post.route'));

dotenv.config({
  path: './config/.env'
});

connectDB();
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));