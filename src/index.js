const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require("./routes");
mongoose.connect('mongodb://maykids:w2w2w2w2@ds045077.mlab.com:45077/trabson', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json());
app.use(routes);

app.listen(3333);
