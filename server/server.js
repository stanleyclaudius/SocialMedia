const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config({
  path: './config/.env'
});

app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));