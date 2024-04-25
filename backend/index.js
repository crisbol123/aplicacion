var cors = require('cors');
const express = require('express');
const lucesR= require("./routes/luces")
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/luces",lucesR)
module.exports = app;