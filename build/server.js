"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "localhost",
    preflightContinue: false
};
app.use(cors(options));
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});
app.get('/hello', function (req, res) {
    res.json({
        greetings: "Hello, API"
    });
});
const upload = multer();
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});
app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
