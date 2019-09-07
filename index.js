const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const users = require('./routes/api/users.js');
const posts = require('./routes/api/posts.js');
const profile = require('./routes/api/profile.js');

const db = require('./config/key').mongoURI;

mongoose.connect(db)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Welcome to Express");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//use stages
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port,
    () => console.log(`listening to the port ${port}`))