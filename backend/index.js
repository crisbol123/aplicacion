

var cors = require('cors');
const express = require('express');
const lucesR= require("./routes/luces")
const alarmaR= require("./routes/alarma")
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/luces",lucesR);
app.use("/alarma",alarmaR)
module.exports = app;