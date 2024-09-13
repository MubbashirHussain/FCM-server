const express = require("express");
const cors = require("cors");
const serviceAccount = require('./google-services_v4.json');
const firebase = require("firebase-admin");
const app = express();
app.use(express.json());
app.use(cors());

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})



app.post("/sendToAll", async (req, res) => {
    try {
        let message = {
            notification: {
                title: req.body.title,
                body: req.body.body
            },
            tokens: req.body.token
        }
        let fb = await firebase.messaging().sendEachForMulticast(message)
        res.send(fb)
    } catch (err) {
        console.log(err)
    }
})

app.post("/sendOne", async (req, res) => {
    try {
        let message = {
            notification: {
                title: req.body.title,
                body: req.body.body
            },
            token: req.body.token
        }
        let fb = await firebase.messaging().send(message)
        res.send(fb)
    } catch (err) {
        console.log(err)
    }
})

app.listen(1005, () => { console.log('server is Runing at 1005') })
