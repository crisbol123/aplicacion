var cors = require('cors');
const express = require('express');
const lucesR= require("./routes/luces")
const alarmaR= require("./routes/alarma")
const modo1 = require("./routes/modo1")
const invitadoC = require("./routes/invitado-crear")
const crud=require("./routes/crud-global")
const adjust_time = require("./routes/adjust-time")
const puertas = require("./routes/puertas")
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/luces",lucesR);
app.use("/alarma",alarmaR);
app.use("/modo1",modo1);
app.use("/invitado-crear",invitadoC);
app.use("/crud-global",crud)
app.use("/adjust-time",adjust_time)
app.use("/puertas",puertas)
module.exports = app;