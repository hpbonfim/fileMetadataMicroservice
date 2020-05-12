import express = require('express')
import cors = require('cors')

// require and use "multer"...
import multer = require('multer')

const app: express.Application = express()

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "localhost" , //API_URL
    preflightContinue: false
  }
app.use(cors(options))

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req: any, res: any) {
    res.sendFile(process.cwd() + '/views/index.html')
})

app.get('/hello', function (req: any, res: any) {
    res.json({
        greetings: "Hello, API"
    })
})

const upload = multer()
app.post("/api/fileanalyse", upload.single("upfile"), function (req: any, res: any) {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
})

app.listen(process.env.PORT || 3000, function (): any {
    console.log('Node.js listening ...')
})