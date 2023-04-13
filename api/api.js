'use strict'

const express = require('express')
const app     = express()
const cors    = require('cors')

const AWS = require('aws-sdk')
const sqs = new AWS.SQS({ region: 'us-east-1' });

const PORTS = {
    rest: 8081
}

const COLA_URL = `https://sqs.us-east-1.amazonaws.com/794809034213/asistencia-cola`

app.use(cors({ 'origin': '*' }))
   .use(express.urlencoded({ limit: '5mb', extended: true }))
   .use(express.json({ limit: '5mb' }))

app.post('/postear', async (req, res) => {
    try {
        console.log('init...')

        const params = {
            DelaySeconds: 2,
            MessageAttributes: {
              "Author": {
                DataType: "String",
                StringValue: "Karandeep Singh"
              },
            },
            MessageBody: JSON.stringify(req.body),
            QueueUrl: COLA_URL
        }
          
        let queueRes = await sqs.sendMessage(params).promise()
        
        return res.status(200).send({msj : 'Posteado.'});
    } catch (err) {
        return res.status(err.status || 500).send(err);
    }
})
    
const server = app.listen(PORTS.rest, () => {
    const host = server.address().address
    const port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
})

