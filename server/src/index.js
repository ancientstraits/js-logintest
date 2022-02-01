import express from 'express'
import bodyParser from 'body-parser'
// import { addPassword } from './pass.js'
import pass from './pass.js'

const app = express()
const port = 8080

app.use(express.static('client'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/signup', async (req, res) => {
    res.redirect('/')
    pass.add(req.body.user, req.body.pass)
})
app.post('/signin', async (req, res) => {
    // res.redirect('/')
    if (await pass.check(req.body.user, req.body.pass))
        res.send('<h1>Succeeded</h1>')
    else
        res.send('<h1>Failed</h1>')
})

const afn = async () => {
    setTimeout(() => {console.log("Hello")}, 2000)
}

app.listen(8080, () => {
    console.log(`listening at http://localhost:${port}`)
})